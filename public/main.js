(function ($) {
  "use strict";

  // slider
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // initiate wow
  new WOW().init();

  // sticky nav
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // change user type
  $(document).ready(function () {
    $("#user-type-dropdown").change(function () {
      $("#user-type").val($(this).val());
    });
  });

  // back to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // carousel slider
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
  });

  //file
  function fetchAndAppendData() {
    const apiUrl = "http://localhost:5000/api/files/"; // Replace with your API URL

    $.getJSON(apiUrl, function (data) {
      // Assuming 'data' is an array of objects
      const $container = $("#ayush"); // The container where data will be appended

      data.forEach((item) => {
        // Create an HTML structure for each item
        const itemHtml = `
          <div class="data-item">
            <h3>${item.name}</h3>
          </div>
        `;
        // Append the item to the container
        $container.append(itemHtml);
      });
    }).fail(function () {
      console.error("An error occurred while fetching data.");
    });
  }
  fetchAndAppendData();
  // Fetch and append data when the document is ready
  $(document).ready(function () {
    fetchAndAppendData();
  });

  function navigateToPage(url) {
    window.location.href = url;
  }

  // Attach the function to the global window object
  window.navigateToPage = navigateToPage;
})(jQuery);
