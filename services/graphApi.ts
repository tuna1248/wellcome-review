import axios from 'axios';

const GRAPH_API_BASE_URL = 'https://graph.facebook.com/v24.0';

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
}

export const socialMediaGraphService = {
  getPages: async (userToken: string): Promise<FacebookPage[]> => {
    try {
      const response = await axios.get(`${GRAPH_API_BASE_URL}/me/accounts`, {
        params: { access_token: userToken },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw new Error('Failed to fetch Facebook pages. Please check your token.');
    }
  },

  getFacebookComments: async (pageId: string, pageToken: string, pageName: string): Promise<any[]> => {
    try {
      const response = await axios.get(`${GRAPH_API_BASE_URL}/${pageId}/posts`, {
        params: {
          access_token: pageToken,
          fields: 'id,message,permalink_url,full_picture,likes.summary(true).limit(0),shares,comments.summary(true){id,message,created_time,from{name,id}}',
        },
      });

      let allComments: any[] = [];
      response.data.data.forEach((post: any) => {
        if (post.comments && post.comments.data) {
          const likesCount = post.likes?.summary?.total_count || 0;
          const commentsCount = post.comments?.summary?.total_count || 0;
          const sharesCount = post.shares?.count || 0;

          post.comments.data.forEach((c: any) => {
            allComments.push({
              id: c.id,
              author: c.from?.name || 'Kullanıcı',
              patientType: 'Guest',
              rating: 5,
              source: 'Facebook',
              date: new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(c.created_time)),
              content: c.message || '',
              status: 'Pending',
              sentiment: 'Neutral',
              topics: ['Social Media'],
              accountName: pageName,
              postText: post.message || 'Facebook Post',
              postLink: post.permalink_url || `https://facebook.com/${post.id}`,
              postImage: post.full_picture || '',
              postMetrics: { likes: likesCount, comments: commentsCount, shares: sharesCount }
            });
          });
        }
      });
      return allComments;
    } catch (error) {
      console.error(`Error fetching FB posts for page ${pageId}:`, error);
      return [];
    }
  },

  getInstagramAccountId: async (pageId: string, pageToken: string): Promise<string | null> => {
    try {
      const response = await axios.get(`${GRAPH_API_BASE_URL}/${pageId}`, {
        params: { access_token: pageToken, fields: 'instagram_business_account' },
      });
      return response.data.instagram_business_account?.id || null;
    } catch (error) {
      return null;
    }
  },

  getInstagramComments: async (igAccountId: string, userToken: string, fallbackName: string): Promise<any[]> => {
    try {
      const response = await axios.get(`${GRAPH_API_BASE_URL}/${igAccountId}/media`, {
        params: {
          access_token: userToken,
          fields: 'id,username,caption,permalink,media_url,like_count,comments_count,comments{id,text,timestamp,username}',
        },
      });

      let allComments: any[] = [];
      response.data.data.forEach((media: any) => {
        const pageName = media.username || fallbackName;
        if (media.comments && media.comments.data) {
          media.comments.data.forEach((c: any) => {
            allComments.push({
              id: c.id,
              author: c.username || 'Kullanıcı',
              patientType: 'Guest',
              rating: 5,
              source: 'Instagram',
              date: new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(c.timestamp)),
              content: c.text || '',
              status: 'Pending',
              sentiment: 'Neutral',
              topics: ['Social Media'],
              accountName: pageName,
              postText: media.caption || 'Instagram Post',
              postLink: media.permalink || `https://instagram.com/p/${media.id}`,
              postImage: media.media_url || '',
              postMetrics: { likes: media.like_count || 0, comments: media.comments_count || 0 }
            });
          });
        }
      });
      return allComments;
    } catch (error) {
      console.error(`Error fetching IG media for account ${igAccountId}:`, error);
      return [];
    }
  },

  fetchAllCommentsAsReviews: async (userToken: string): Promise<any[]> => {
    const pages = await socialMediaGraphService.getPages(userToken);
    let allReviews: any[] = [];

    for (const page of pages) {
      const fbComments = await socialMediaGraphService.getFacebookComments(page.id, page.access_token, page.name);
      allReviews = [...allReviews, ...fbComments];

      const igAccountId = await socialMediaGraphService.getInstagramAccountId(page.id, page.access_token);
      if (igAccountId) {
        const igComments = await socialMediaGraphService.getInstagramComments(igAccountId, userToken, page.name);
        allReviews = [...allReviews, ...igComments];
      }
    }

    return allReviews;
  }
};
