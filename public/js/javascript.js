const ValidURL = (str) => {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}
const copy = () => {

}
$(document).ready(() => {
    $('#submit').click(() => {
        const url = $('#url').val()
        if (ValidURL(url)) {
            $.post("/get-url",
                {
                    url: url
                },
                (data) => {
                    $('.show').html('<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div><div class="modal-body">' + data[0].short_url + '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>')
                    $("#exampleModalCenter").modal();
                    $('.list').html('<table class="table"><tr><th scope="col">url</th><th scope="col">Short url</th></tr></table > ')
                    data.forEach(data => {
                        $('.table').append('<tbody><tr><td>' + data.url + '</td><td>' + data.short_url + '</td></tr></tbody>')
                    });
                });
        } else {
            alert('not url')
        }
    })
})