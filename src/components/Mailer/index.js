import emailjs from 'emailjs-com';

const Mailer=(e, mailType) => {
  var template = ""
  if (mailType==="registro"){
    template = "template_uy5yp2l"
  }else{
    template = "template_o5o1sme"
  }
}
export default Mailer