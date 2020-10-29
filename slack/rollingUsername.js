/*
 * 
 *  (c) Dyrk.org - 2020/2021
 *  Dave-Hill [arobase] dyrk [dot] org
 *
 * Play this script in Developper Console on
 *  a Slack tab where your are logged
 *  make a manual single change on your
 *  username ... and let's magic operate
 *
*/

document.username = "Dave Hill"

rollingUsername = () => {
    let xhr = new XMLHttpRequest(), form_data = new FormData(), datas_form = {
        profile: {
                "display_name":document.username ,
                "phone":"",
                "real_name":document.username ,
                "skype":"",
                "title":"",
                "fields":{}},
            token: document.token,
            _x_mode: "online",
            _x_sonic: "true"
    };
    xhr.withCredentials = true;
    Object.keys(datas_form).map(e => form_data.append(e, typeof datas_form[e] == 'object' ? JSON.stringify(datas_form[e]) :datas_form[e] ));
    xhr.open('POST', 'https://app.slack.com/api/users.profile.set');
    xhr.send(form_data);
    document.username = document.username.substr(-1) + document.username.substr(0,document.username.length-1);
};
XMLHttpRequest.prototype.send2 = XMLHttpRequest.prototype.send2 ? XMLHttpRequest.prototype.send2 :             XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(x){
    try {
        let datas = JSON.parse(x);
        if (datas.token && !document.token)
        {

           this.addEventListener('load', e => {
            if (e.target.responseURL.match(/users\/info$/)) {
                console.error('OK');
                document.token = datas.token ;
                setInterval(rollingUsername, 2000);
            }
           });
        }
    } catch (e){ };
    return this.send2(x);
}

