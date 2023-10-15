var itemData;
$(document).ready(function () {
    startTimer(500 - 120, $('#offerend-time'));
    $(".form-check").on('click', function () {
        $(".form-check").removeClass('active');
        $(this).addClass('active');
    });
    $("#back_btn").on("click", function () {
        history.back();
    });

    // var selected_verient = localStorage.getItem("selected_verient");
    // itemData = JSON.parse(selected_verient);
    // $("#item_image").prop('src', itemData.img1);
    // var name = itemData.name + " " + ((itemData.color) ? ' (' + itemData.color + ')' : '') + ((itemData.size) ? ' (' + itemData.size + ')' : '') + ((itemData.storage) ? ' (' + itemData.storage + ')' : '');
    // $("#product-title").html(name);
    // $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
    // $(".mrp").html("&#8377;" + itemData.mrp);
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + "min " + seconds + "sec");

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function payNow(upi_id,rs) {
    var payType = $(".form-check.active").attr('pay-type');
    //alert("ID: "+payType);
    var redirect_url = "";
    var site_name = "Online Shopping";
    var upi_address = upi_id;
    var amt = parseFloat(rs).toFixed(2);
    switch (payType) {
        case 'gpay':
            redirect_url = "gpay://upi/pay?pa=" + upi_address + "&am=" + amt + "&pn=Flipkart%20store&tn=order1445721688&tr=1445721688&&mc=0000";
            //redirect_url = "gpay://upi/pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + site_name;
            break;

        case 'phonepe':
            redirect_url = "phonepe://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + site_name;
            break;

        case 'paytm':
            redirect_url = "paytmmp://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + site_name;
            break;

        case 'bhim_upi':
            redirect_url = "bhim://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + site_name;
            break;

        case 'whatspp_pay':
            redirect_url = "whatsapp://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + site_name;
            break;

        default:
            break;
    }
    window.location.href = redirect_url;
}