export type User = {
	id: string;
	nickname: string;
	age: number;
	gender: string;
	state: string;
	plan_type: string;
	profile_image?: string;
	notification_settings?: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
	posts: Post[];
	comments: Comment[];
	likes: Like[];
	user_tenants: UserTenant[];
	notifications: Notification[];
	commentVote: CommentVote[];
};

export type Tenant = {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	userTenants: UserTenant[];
};

export type UserTenant = {
	id: string;
	user_id: string;
	tenant_id: string;
	is_default: boolean;
	created_at: Date;
	updated_at: Date;
	user: User;
	tenant: Tenant;
};

export type Country = {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	state: State[];
	facility: Facility[];
};

export type State = {
	id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	lgas: LGA[];
	facility: Facility[];
};

export type LGA = {
	id: string;
	state_id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	state: State;
	suburbs: Suburb[];
	facility: Facility[];
};

export type Suburb = {
	id: string;
	lga_id: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	lga: LGA;
	facility: Facility[];
};

export enum FacilityType {
	WORKPLACE = "WORKPLACE",
	ACCOMMODATION = "ACCOMMODATION",
}

export type Facility = {
	id: string;
	country_id: string;
	state_id: string;
	lga_id: string;
	suburb_id: string;
	type: FacilityType;
	name: string;
	state: State;
	lga: LGA;
	suburb: Suburb;
	posts: Post[];
};

export type Facilities = Facility[];

export enum PostType {
	REVIEW = "REVIEW",
	RECRUITMENT = "RECRUITMENT",
}

export type Post = {
	id: string;
	user_id: string;
	facility_id: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
	facility: Facility;
	user: User;
	type: PostType;
	workplace?: Workplace;
	accommodation?: Accommodation;
	comments: Comment[];
	likes: Like[];
	images: ImageData[];
};

export type Workplace = {
	post_id: string;
	wage?: number;
	atmosphere: string[];
	rating?: number;
	comment?: string;
	job_category?: string;
	post: Post;
};

export type Accommodation = {
	post_id: string;
	rent?: number;
	setup: string[];
	rating?: number;
	comment?: string;
	post: Post;
};

export type ImageData = {
	id: string;
	post_id: string;
	url: string;
	created_at: Date;
	deleted_at?: Date;
	post: Post;
};

export type Comment = {
	id: string;
	user_id: string;
	post_id: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
	is_hidden: boolean;
	user: User;
	post: Post;
	votes: CommentVote[];
	adminNotification: AdminNotification[];
};

export enum VoteType {
	UPVOTE = "UPVOTE",
	DOWNVOTE = "DOWNVOTE",
}

export type CommentVote = {
	id: string;
	user_id: string;
	comment_id: string;
	vote_type: VoteType;
	created_at: Date;
	user: User;
	comment: Comment;
};

export type AdminNotification = {
	id: string;
	comment_id: string;
	message: string;
	notified_at: Date;
	comment: Comment;
};

export type Like = {
	id: string;
	user_id: string;
	post_id: string;
	created_at: Date;
	deleted_at?: Date;
	user: User;
	post: Post;
};

export enum NotificationTargetType {
	POST = "POST",
	COMMENT = "COMMENT",
}

export type Notification = {
	id: string;
	user_id: string;
	type: string;
	content: string;
	target_id: string;
	target_type: NotificationTargetType;
	is_read: boolean;
	created_at: Date;
	deleted_at?: Date;
	user: User;
};

export type SetFacilities = (facilities: Facility[]) => void;

// export type Locations = Location[];

// export type Image = {
//     id: string;
//     post_id: string;
//     url: string;
//     created_at: string;
//     deleted_at: string | null;
// };

// export type Workplace = {
//     post_id: string;
//     wage: number;
//     atmosphere: string[];
//     rating: number;
//     comment: string;
// };

// export type Accommodation = {
//     post_id: string;
//     rent: number;
//     setup: string[];
//     rating: number;
//     comment: string;
// };

// export type PostDetail = {
//     id: string;
//     location_id: string;
//     post_type: string;
//     user_id: string;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string | null;
//     image: Image[];
//     workplace: Workplace | null;
//     accommodation: Accommodation | null;
// };

// export type Location = {
//     id: string;
//     name: string;
//     lga: string;
//     state: string;
//     suburb: string;
//     created_at: string;
//     updated_at: string;
//     posts: PostDetail[];
// };

export type SetLocations = (locations: Location[]) => void;

export type MapContainerRef = React.RefObject<HTMLDivElement | null>;

export type MapRef = React.RefObject<Map | null>;

export type MaplibreMap = Map;

export type FilterSearch = {
	type?: string;
	wageRange?: [number, number]; // 時給の範囲
	rentRange?: [number, number]; // 家賃の範囲
	rating?: number; // おすすめ度
};

// whereOptionsの型定義
export type whereCondition = {
	country?: {
		id: string;
	};
	posts?: {
		some?: {
			AND?: Array<{
				[key: string]: {
					[field: string]: {
						gte?: number;
						lte?: number;
					};
				};
			}>;
		};
	};
};

export type IncludeOptions = {
	country: boolean;
	state: boolean;
	lga: boolean;
	suburb: boolean;
	posts: {
		include: {
			images: boolean;
			workplace?: boolean;
			accommodation?: boolean;
		};
		where: {
			[key: string]: {
				[field: string]: {
					gte?: number;
					lte?: number;
				};
			};
		};
	};
};

export type MinMax = {
	gte?: number;
	lte?: number;
};

export type PostIncludeType = "workplace" | "accommodation";
