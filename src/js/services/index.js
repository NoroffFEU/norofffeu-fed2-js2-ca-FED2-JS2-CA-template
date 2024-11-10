import AuthService from './AuthService';
import PostService from './PostService';
import ProfileService from './ProfileService';
import TagService from './TagService';
import FollowService from './FollowService';
import SearchService from './SearchService';
import CommentRepository from '../repositories/CommentRepository';

const services = {
  AuthService,
  PostService,
  ProfileService,
  TagService,
  FollowService,
  SearchService,
  CommentRepository
};

export default services;
