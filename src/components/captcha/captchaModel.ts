export interface CaptchaModel {
    captchaId?: string;
    questionImage?: QuestionImage;
    answerImageList?: AnswerImage[];
  }
  
  interface QuestionImage {
    content: string;
    imageType: string;
  }
  
  export interface AnswerImage {
    id: string;
    content: string;
    imageType: string;
  }