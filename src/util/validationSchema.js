import * as Yup from 'yup';



export const postSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Title Required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Description Required'),
});