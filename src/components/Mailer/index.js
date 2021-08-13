import emailjs from 'emailjs-com';

const Mailer=(e, mailType) => {
  var template = ""
  if (mailType==="registro"){
    template = "template_uy5yp2l"
  }else{
    template = "template_o5o1sme"
  }

  emailjs.sendForm('service_x9q2e6a', template, e.target, 'user_zbtd9FWQ1S1q7XRSiPlyz')
    .then((result) => {
      console.log(result);
    }, (error) => {
      console.log(error.text);
    });
}
export default Mailer