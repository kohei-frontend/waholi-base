export type Post = {
    id: string;
    userId: string;
    postType: string;
    state: string;
    lga: string;
    suburb: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type Posts = Post[];
  
export type SetPosts = (posts: Post[]) => void;

export type MapContainerRef = React.RefObject<HTMLDivElement | null>;

export type MapRef = React.RefObject<Map | null>;

export type MaplibreMap = Map;

