import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { INSTAGRAM_API_URL, INSTAGRAM_ACCESS_TOKEN } from '../../config';

type Props = {}

export type InstagramPost = {
  id:string;
  title: string;
  description: string;
}

const InstagramFeed = (props: Props) => {
  const [feed, setFeed] = useState<InstagramPost>();

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await axios.get(`${INSTAGRAM_API_URL}/users/self/media/recent/?access_token=${INSTAGRAM_ACCESS_TOKEN}`)
        console.log(response.data.data);
        setFeed(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstagramFeed();
  }, []);

  return (
    <div>
      <h2>Instagram Feed</h2>
      <ul>
        {feed?.map((post: { id: React.Key | null | undefined; images: { standard_resolution: { url: string | undefined; }; }; caption: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }; }) => (
          <li key={post.id}>
            <img src={post.images.standard_resolution.url} alt={post.caption.text} />
            <p>{post.caption.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstagramFeed;
