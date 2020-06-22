import controller from '../controllers/controller.js'

const app = Sammy ('body', function(){
    this.use('Handlebars','hbs');

    this.get('/home',controller.getHome);
    this.get('/login', controller.user.login.get);
    this.post('/login', controller.user.login.post);

    this.get('/register',controller.user.register.get);
    this.post('/register',controller.user.register.post);

    this.get('/logout',controller.user.logout.get);

    this.get('/create', controller.event.create.get);
    this.post('/create', controller.event.create.post);

    this.get('/details/:id', controller.event.details.get);

    this.get('/edit/:id', controller.event.edit.get);
    this.post('/edit/:id', controller.event.edit.post);

    this.get('/close/:id', controller.event.close.get);
    this.get('/join/:id', controller.event.join.get);

    this.get('/profile', controller.user.profile.get);



});
app.run('/home');