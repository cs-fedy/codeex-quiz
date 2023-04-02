export enum Models {
  users = 'users',
  refreshes = 'refreshes',
  quizzes = 'quizzes',
  collections = 'collections',
  collectionQuizzes = 'collection_quizzes',
  newQuizzes = 'new_quizzes',
  notifications = 'notifications',
  multipleChoiceQuestion = 'multiple_choice_questions',
  uniqueChoiceQuestion = 'unique_choice_questions',
  trueFalseQuestion = 'true_false_questions',
  subQuizzes = 'sub_quizzes',
}

export enum Mappers {
  user = 'user_mapper',
  refresh = 'refresh_mapper',
  quiz = 'quiz_mapper',
  collection = 'collection_mapper',
  collectionQuiz = 'collection_quiz_mapper',
  newQuizNotification = 'new_quiz_notification_mapper',
  multipleChoiceQuestion = 'multiple_choice_question_mapper',
  subQuiz = 'sub_quiz_mapper',
  uniqueChoiceQuestion = 'unique_choice_question_mapper',
  trueFalseQuestion = 'true_false_question_mapper',
}

export enum Repos {
  user = 'user_repo',
  refresh = 'refresh_repo',
  whiteList = 'whiteList_repo',
  cache = 'cache_repo',
  quiz = 'quiz_repo',
  collection = 'collection_repo',
  collectionQuiz = 'collection_quiz_repo',
  newQuizNotification = 'new_quiz_notification_repo',
  notification = 'notification_repo',
  multipleChoiceQuestion = 'multiple_choice_question_repo',
  subQuiz = 'sub_quiz_repo',
  uniqueChoiceQuestion = 'unique_choice_question_repo',
  trueFalseQuestion = 'true_false_question_repo',
}

export enum Services {
  user = 'user_service',
  profile = 'profile_service',
  access = 'access_service',
  hash = 'hash_service',
  refresh = 'refresh_service',
  auth = 'auth_service',
  mail = 'mail_service',
  resetPassword = 'reset_password_service',
  confirmAccount = 'confirm_account_service',
  file = 'file_service',
  account = 'accounts_service',
  admin = 'admin_service',
  collection = 'collection_service',
  collectionQuiz = 'collection_quiz_service',
  quiz = 'quiz_service',
  quizApproval = 'quiz_approval_service',
  notification = 'notification_service',
  multipleChoiceQuestion = 'multiple_choice_question_service',
  subQuiz = 'sub_quiz_service',
  uniqueChoiceQuestion = 'unique_choice_question_services',
  trueFalseQuestion = 'true_false_question_services',
}

export enum Roles {
  user = 'user',
  admin = 'admin',
  self = 'self',
}

export enum Routes {
  auth = 'auth',
  register = 'register',
  login = 'login',
  refresh = 'refresh',
  logout = 'logout',
  users = 'users',
  logged = 'logged',
  password = 'password',
  request = 'request',
  reset = 'reset',
  confirmAccount = 'confirm_account',
  requestConfirmAccount = 'request_confirm_account',
  email = 'email',
  profiles = 'profiles',
  image = 'image',
  files = 'files',
  accounts = 'accounts',
  confirm = 'confirm',
  quizzes = 'quizzes',
  admin = 'admin',
  collections = 'collections',
  collectionQuizzes = 'collection_quizzes',
  public = 'public',
  quizzesApproval = 'quizzes_approval',
  notifications = 'notifications',
  newQuizzes = 'new_quizzes',
  emitter = 'emitter',
  multipleChoiceQuestions = 'multiple_choice_questions',
  subQuizzes = 'sub_quizzes',
  uniqueChoiceQuestions = 'unique_choice_questions',
  trueFalseQuestions = 'true_false_questions',
}

export enum Jobs {
  newUserExist = 'new_user_exist_job',
  newConfirmEmailRequest = 'new_confirm_email_request_job',
  newResetPasswordRequest = 'new_reset_password_request_job',
  newPasswordUpdated = 'new_password_updated_job',
  newProfileEmailUpdated = 'new_profile_email_updated_job',
  newProfilePasswordUpdated = 'new_profile_password_updated_job',
  newQuizNotification = 'new_quiz_notification_job',
  quizApprovedNotification = 'quiz_approved_notification_job',
  newSubQuiz = 'new_sub_quiz_job',
}

export enum Queues {
  users = 'users_queue',
  profiles = 'profiles_queue',
  accounts = 'accounts_queue',
  resetPassword = 'reset_password_queue',
  newQuizNotification = 'new_quiz_notification_queue',
  newSubQuiz = 'new_sub_quiz_queue',
}

export enum Events {
  user = 'user_events',
  profile = 'profile_events',
  accounts = 'accounts_events',
  resetPassword = 'reset_password_events',
  newQuizNotification = 'new_quiz_notification_events',
  newSubQuiz = 'new_sub_quiz_events',
}

export enum NotificationStatus {
  read = 'read',
  unread = 'unread',
}

export const imagesMimeTypeRegex = /(^image)(\/)[a-zA-Z0-9_]*/gm

export const defaultAvatar = 'https://opus-platform-s3.s3.eu-central-1.amazonaws.com/DSC_0221.jpg'
export const accessKey = 'access'
export const refreshKey = 'refresh'
export const confirmEmailKey = 'confirm_email_key'
export const resetPasswordKey = 'reset_password_key'
export const oneMegabyte = 1000000
