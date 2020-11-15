/*
 * 
 *  (c) Dyrk.org - 2020/2021
 *  Dave-Hill [arobase] dyrk [dot] org
 *
 * Play this script in Developper Console on
 *  a Slack tab where your are logged
 *  set manually your status to away or active ...
 *  Let the magic
 *
*/

document.slackStatus = 'away';
blinkStatus = () => {
    let xhr = new XMLHttpRequest(), form_data = new FormData(), datas_form = {
        presence : document.slackStatus,
        token    : document.token,
        _x_mode  : 'online',
        _x_sonic : 'true'
    };
    document.slackStatus = document.slackStatus == 'away' ? 'active' : 'away';
    xhr.withCredentials = true;
    Object.keys(datas_form).map(e => form_data.append(e, datas_form[e]));
    xhr.open('POST', 'https://app.slack.com/api/presence.set');
    xhr.send(form_data);
};
XMLHttpRequest.prototype.send2 = XMLHttpRequest.prototype.send2 ? XMLHttpRequest.prototype.send2 : XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(x){
    try {
        let token = x.getAll('token');
        if (token && token.length >= 1 && !document.token)
        {
           document.token = token[0]
           setInterval(blinkStatus, 250);
        }
    } catch (e){ console.error(e, x.getAll('token')[0]) };
    return this.send2(x);
}
