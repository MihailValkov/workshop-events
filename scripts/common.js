export async function setCommon(context) {
  
  context.isLogged = !!sessionStorage.getItem("username");
  context.username = sessionStorage.getItem("username");
  context.partials = {
    header: await context.load("../views/common/header.hbs"),
    footer: await context.load("../views/common/footer.hbs"),
  };

  return context;
}

export function message(message,type,direction,context){
  if (type === 'success') {
    document.getElementById('successBox').textContent= message;
    document.getElementById('successBox').style.display= 'block';
    setTimeout(function(){
      context.redirect(direction);
        document.getElementById('successBox').style.display= 'none';
    },1000)
  } else {
    document.getElementById('errorBox').textContent= message;
    document.getElementById('errorBox').style.display= 'block';
    setTimeout(function(){
      context.redirect(direction);
      document.getElementById('errorBox').style.display= 'none';
  },1000)

  }

}
