import * as types from '../actionTypes';

const initialSectionState = {
  data: [],
  loading: false,
  error: null
};

const initialState = {
  popular: { ...initialSectionState },
  trending: { ...initialSectionState },
  upcoming: { ...initialSectionState },
  topRated: { ...initialSectionState },
  nowPlaying: { ...initialSectionState },
  discover: {
    data: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
    loading: false,
    error: null
  },
  selectedMovie: {
    data: null,
    loading: false,
    error: null
  },
  credits: {
    data: [],
    loading: false,
    error: null
  },
  similar: {
    data: [],
    loading: false,
    error: null
  },
  videos: {
    data: [],
    loading: false,
    error: null
  },
  search: {
    data: [],
    loading: false,
    error: null,
    query: '',
    totalResults: 0,
    totalPages: 1
  }
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_POPULAR_REQUEST:
      return { ...state, popular: { ...state.popular, loading: true, error: null } };
    case types.FETCH_POPULAR_SUCCESS:
      return { ...state, popular: { data: action.payload, loading: false, error: null } };
    case types.FETCH_POPULAR_FAILURE:
      return { ...state, popular: { ...state.popular, loading: false, error: action.payload } };

    case types.FETCH_TRENDING_REQUEST:
      return { ...state, trending: { ...state.trending, loading: true, error: null } };
    case types.FETCH_TRENDING_SUCCESS:
      return { ...state, trending: { data: action.payload, loading: false, error: null } };
    case types.FETCH_TRENDING_FAILURE:
      return { ...state, trending: { ...state.trending, loading: false, error: action.payload } };

    case types.FETCH_UPCOMING_REQUEST:
      return { ...state, upcoming: { ...state.upcoming, loading: true, error: null } };
    case types.FETCH_UPCOMING_SUCCESS:
      return { ...state, upcoming: { data: action.payload, loading: false, error: null } };
    case types.FETCH_UPCOMING_FAILURE:
      return { ...state, upcoming: { ...state.upcoming, loading: false, error: action.payload } };

    case types.FETCH_TOP_RATED_REQUEST:
      return { ...state, topRated: { ...state.topRated, loading: true, error: null } };
    case types.FETCH_TOP_RATED_SUCCESS:
      return { ...state, topRated: { data: action.payload, loading: false, error: null } };
    case types.FETCH_TOP_RATED_FAILURE:
      return { ...state, topRated: { ...state.topRated, loading: false, error: action.payload } };

    case types.FETCH_NOW_PLAYING_REQUEST:
      return { ...state, nowPlaying: { ...state.nowPlaying, loading: true, error: null } };
    case types.FETCH_NOW_PLAYING_SUCCESS:
      return { ...state, nowPlaying: { data: action.payload, loading: false, error: null } };
    case types.FETCH_NOW_PLAYING_FAILURE:
      return { ...state, nowPlaying: { ...state.nowPlaying, loading: false, error: action.payload } };

    case types.FETCH_DISCOVER_REQUEST:
      return { ...state, discover: { ...state.discover, loading: true, error: null } };
    case types.FETCH_DISCOVER_SUCCESS:
      return {
        ...state,
        discover: {
          data: action.payload.append
            ? [...state.discover.data, ...action.payload.results]
            : action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalResults: action.payload.totalResults,
          loading: false,
          error: null
        }
      };
    case types.FETCH_DISCOVER_FAILURE:
      return { ...state, discover: { ...state.discover, loading: false, error: action.payload } };

    case types.FETCH_MOVIE_DETAILS_REQUEST:
      return { ...state, selectedMovie: { data: null, loading: true, error: null } };
    case types.FETCH_MOVIE_DETAILS_SUCCESS:
      return { ...state, selectedMovie: { data: action.payload, loading: false, error: null } };
    case types.FETCH_MOVIE_DETAILS_FAILURE:
      return { ...state, selectedMovie: { data: null, loading: false, error: action.payload } };

    case types.FETCH_CREDITS_REQUEST:
      return { ...state, credits: { ...state.credits, loading: true, error: null } };
    case types.FETCH_CREDITS_SUCCESS:
      return { ...state, credits: { data: action.payload, loading: false, error: null } };
    case types.FETCH_CREDITS_FAILURE:
      return { ...state, credits: { ...state.credits, loading: false, error: action.payload } };

    case types.FETCH_SIMILAR_REQUEST:
      return { ...state, similar: { ...state.similar, loading: true, error: null } };
    case types.FETCH_SIMILAR_SUCCESS:
      return { ...state, similar: { data: action.payload, loading: false, error: null } };
    case types.FETCH_SIMILAR_FAILURE:
      return { ...state, similar: { ...state.similar, loading: false, error: action.payload } };

    case types.FETCH_VIDEOS_REQUEST:
      return { ...state, videos: { ...state.videos, loading: true, error: null } };
    case types.FETCH_VIDEOS_SUCCESS:
      return { ...state, videos: { data: action.payload, loading: false, error: null } };
    case types.FETCH_VIDEOS_FAILURE:
      return { ...state, videos: { ...state.videos, loading: false, error: action.payload } };

    case types.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
          error: null,
          query: action.payload
        }
      };
    case types.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        search: {
          data: action.payload.results,
          loading: false,
          error: null,
          query: action.payload.query,
          totalResults: action.payload.totalResults,
          totalPages: action.payload.totalPages
        }
      };
    case types.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload
        }
      };
    case types.CLEAR_SEARCH:
      return {
        ...state,
        search: {
          data: [],
          loading: false,
          error: null,
          query: '',
          totalResults: 0,
          totalPages: 1
        }
      };

    default:
      return state;
  }
}
