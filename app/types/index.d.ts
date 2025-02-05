export type Locations = Location[];

export type Image = {
    id: string;
    post_id: string;
    url: string;
    created_at: string;
    deleted_at: string | null;
};

export type Workplace = {
    post_id: string;
    wage: number;
    atmosphere: string[];
    rating: number;
    comment: string;
};

export type Accommodation = {
    post_id: string;
    rent: number;
    setup: string[];
    rating: number;
    comment: string;
};

export type PostDetail = {
    id: string;
    location_id: string;
    post_type: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    image: Image[];
    workplace: Workplace | null;
    accommodation: Accommodation | null;
};

export type Location = {
    id: string;
    name: string;
    lga: string;
    state: string;
    suburb: string;
    created_at: string;
    updated_at: string;
    posts: PostDetail[];
};
  
export type SetLocations = (locations: Location[]) => void;

export type MapContainerRef = React.RefObject<HTMLDivElement | null>;

export type MapRef = React.RefObject<Map | null>;

export type MaplibreMap = Map;

