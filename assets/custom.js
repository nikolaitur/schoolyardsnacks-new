var is_apple_pie = false;
$(document).ready(function () {
  // headerPromo();
  // check_upsell_product();

  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get("ut") == "valentine") {
    localStorage.setItem("valentine-offer", "true");
  }

  let nIntervId;
  nIntervId = setInterval(function () {
    // console.log("setInterval");
    var subRcPrice = $("#rc_price_autodeliver").text();
    if (subRcPrice != "") {
      $("#sub_rc_price_autodeliver").text(subRcPrice);
      clearInterval(nIntervId);
    }
  }, 500);

  $("#mobile-navigation-wrapper").css(
    "height",
    $(window).height() - 105 + "px"
  );

  $(".accordion-header").click(function (e) {
    if ($(this).hasClass("is-active")) {
      $(".accordion-header.is-active").next().slideUp();
      $(".accordion-header").removeClass("is-active");
    } else {
      $(".accordion-header.is-active").next().slideUp();
      $(".accordion-header").removeClass("is-active");
      var tar = $(this)?.next();
      tar?.slideToggle();
      $(this).toggleClass("is-active");
    }
  });

  $("#shopify-section-ytlander-section7 .container > a").on(
    "click",
    function (e) {}
  );
  $(".navigation-main-link").on("click", function (e) {
    if ($(this).attr("href") == "#rave_reviews") {
      $("html, body").animate(
        {
          scrollTop: $(".section--reviews")?.offset()?.top - 240,
        },
        800
      );
    }
    if ($(this).attr("href") == "#shopify-section-ytlander-section4") {
      $("html, body").animate(
        {
          scrollTop:
            $("#shopify-section-ytlander-section4")?.offset()?.top - 100,
        },
        800
      );
    } else if ($(this).attr("href") == "#best-macros-img") {
      $("html, body").animate(
        {
          scrollTop: $(".best-macros-heading")?.offset()?.top - 100,
        },
        800
      );
    } else if ($(this).attr("href") == "#nut_facts") {
      $("html, body").animate(
        {
          scrollTop:
            $(".slider--product-nutritional-cereal")?.offset()?.top - 240,
        },
        800
      );
    }
  });

  var geoInfo = localStorage.getItem("Fomo.geocodeResponse");

  function json(url) {
    return fetch(url).then((res) => res.json());
  }

  if (location.href.indexOf("pages/gifts?sec") != -1) {
    if (location.href.indexOf("=popular") != -1) {
      key = 3;
    }
    if (location.href.indexOf("=tooth") != -1) {
      key = 4;
    }
    if (location.href.indexOf("=puffs") != -1) {
      key = 5;
    }
    if (location.href.indexOf("=bundles") != -1) {
      key = 6;
    }
    $("html, body").animate(
      {
        scrollTop:
          $(
            "#shopify-section-gift-collection .bf-collection-content:nth-child(" +
              key +
              ")"
          )?.offset()?.top - 140,
      },
      800
    );
  }

  if (location.href.indexOf("pages/holiday-bundles?sec") != -1) {
    console.log("scroll---------------");
    if (location.href.indexOf("=tooth") != -1) {
      key = 2;
    }
    if (location.href.indexOf("=puffs") != -1) {
      key = 3;
    }
    if (location.href.indexOf("=gift") != -1) {
      key = 4;
    }
    $("html, body").animate(
      {
        scrollTop:
          $(
            "#shopify-section-holiday-collection .bf-collection-content:nth-child(" +
              key +
              ")"
          )?.offset()?.top - 140,
      },
      800
    );
  }

  localStorage.setItem("add-to-cart", "false");
  // console.log("document ready");

  $("[data-bundle-minus]").on("click", function (e) {
    let $qtyInput = $(this).closest(".current_value").find(".value");
    let qty = $qtyInput.attr("data-bundle-qty-value");
    if (qty > 1) {
      qty--;
      $qtyInput.attr("data-bundle-qty-value", qty);
      $qtyInput.html(qty + " Bundle");
    }
  });

  $(document).on("click", "[data-bundle-plus]", function (e) {
    let $qtyInput = $(this).closest(".current_value").find(".value");
    let qty = $qtyInput.attr("data-bundle-qty-value");
    qty++;
    $qtyInput.attr("data-bundle-qty-value", qty);
    $qtyInput.html(qty + " Bundle");
  });

  $(".bf-collection-addtocart").on("click", function () {
    const $productForm = $(this).closest("form");
    const qty = $productForm
      .find("[data-bundle-qty-value]")
      .attr("data-bundle-qty-value");
    const variantId = $productForm.find(".product-select").val();
    console.log("add to cart bundle");
    CartJS.addItem(
      variantId,
      qty,
      {},
      {
        success: function (data, textStatus, jqXHR) {
          console.log("add to cart success");
          console.log(data);
          updateCartDrawerUI();
          // cart_calc();
          $(".cart-drawer-toggle").trigger("click");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error: " + errorThrown + "!");
        },
      }
    );
  });

  $(document).on("click", ".onetime_upsell_add", function (e) {
    $(this).toggleClass("is--active");
  });

  if (window.location.href.indexOf("challenge#contact_form") > -1) {
    setTimeout(function () {
      $(window).scrollTop(0);
      console.log("contact us page");
    }, 500);
  }
  if (window.location.href.indexOf("schoolyardclub.com") > -1) {
    location.href = "https://www.facebook.com/groups/141046800441469";
  }
  if (
    (window.location.href.indexOf("products/keto-puffs") > -1 &&
      window.location.href.indexOf("?view=newstyle") > -1) ||
    (window.location.href.indexOf("products/cereal") > -1 &&
      window.location.href.indexOf("?view=newstyle") > -1)
  ) {
    $("#old_styl_pdp_form").addClass("hide--item");
    $("#new_styl_pdp_form").removeClass("hide--item");
  }

  var $button = $(".product-container__side--right");
  if ($button) {
    var posTop = $button?.offset()?.top + $button.height();

    if (posTop == 0) posTop = $(window).height();
    $(window).scroll(function () {
      var $product_container = $(".product-container.container");
      var scroll = $(window).scrollTop() - 300;

      var windowHeight = $(window).height();
      if (scroll > posTop) {
        $product_container.addClass("scroll");
      } else {
        $product_container.removeClass("scroll");
      }
    });
  }

  $("#bundle-prod-qty .qty-min").click(function () {
    var qty = parseInt($("#bundle-prod-qty .number").html());
    if (qty > 1) qty -= 1;
    $("#bundle-prod-qty .number").html(qty);
    $("#add-to-cart")
      .closest(".product-action")
      .find('input[type="hidden"]')
      .val(qty);
  });

  $("#bundle-prod-qty .qty-plus").click(function () {
    var qty = parseInt($("#bundle-prod-qty .number").html());
    qty += 1;
    $("#bundle-prod-qty .number").html(qty);
    $("#add-to-cart")
      .closest(".product-action")
      .find('input[type="hidden"]')
      .val(qty);
  });

  $("[data-modal-close]").click(function (e) {
    e.preventDefault();
    $(this).closest(".modal-wrapper").removeClass("is_active");
    if ($(this).attr("href") == "/checkout") {
      location.href = "/checkout";
    }
  });

  $("[data-apple-variant-add]").click(function (e) {
    e.preventDefault();
    console.log("apple variant id: " + apple_variant_id);
    CartJS.addItem(
      apple_variant_id,
      1,
      {},
      {
        success: function (data, textStatus, jqXHR) {
          console.log("Apple variant is added");
          location.href = "/checkout";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error: " + errorThrown + "!");
        },
      }
    );
  });

  if ($(".sold-in-number") && $("#add-to-cart-form")) {
    var productId = $("#add-to-cart-form").attr("data-productid");
    var soldInNum = localStorage.getItem(productId + "SoldIn");
    if (!soldInNum) {
      soldInNum = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
      localStorage.setItem(productId + "SoldIn", soldInNum);
    }
    $(".sold-in-number").html(soldInNum);
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Homepage slider
  $(".homepage-slider").each(function () {
    var section_id = $(this).data("section-id");
    var productId = $(this).data("product-id");
    var soldInNum = localStorage.getItem(productId + "SoldIn");
    if (!soldInNum) {
      soldInNum = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
      localStorage.setItem(productId + "SoldIn", soldInNum);
    }
    $("[data-section-id='" + section_id + "'] .sold-in-number").html(soldInNum);
  });
  //end

  console.log("document ready redirect funtion");
  if (window.location.href.indexOf("?sec=gift") > 0) {
    scroll_move_gift(1);
  } else if (window.location.href.indexOf("?sec=popular") > 0) {
    scroll_move_gift(2);
  } else if (window.location.href.indexOf("?sec=sweet") > 0) {
    scroll_move_gift(3);
  } else if (window.location.href.indexOf("?sec=cheese") > 0) {
    scroll_move_gift(4);
  } else if (window.location.href.indexOf("?sec=mystery") > 0) {
    scroll_move_gift(5);
  }

  function scroll_move_gift(param) {
    $("body,html").animate(
      {
        scrollTop:
          $(
            "#shopify-section-gift-collection .bf-collection-content:nth-child(" +
              param +
              ")"
          )?.offset()?.top - $("#shopify-section-header .header").height(),
      },
      800 //speed
    );
  }

  $(".current_value").on("click", ".minus", function () {
    var current_qty = $(this)
      .parent(".current_value")
      .parent(".quantity")
      .parent("form.product-form")
      .children(".qty")
      .val();
    current_qty = parseInt(current_qty);
    if (current_qty != 1) {
      current_qty -= 1;
    }
    $(this)
      .parent(".current_value")
      .parent(".quantity")
      .parent("form.product-form")
      .children(".qty")
      .val(current_qty);
    if (current_qty == 1)
      $(this)
        .parent(".current_value")
        .children(".value")
        .text(current_qty + " Bundle");
    else
      $(this)
        .parent(".current_value")
        .children(".value")
        .text(current_qty + " Bundles");
  });
  $(".current_value").on("click", ".plus", function () {
    var max_quantity = $(this)
      .parent(".current_value")
      .parent(".quantity")
      .parent("form.product-form")
      .children(".max")
      .data("max");
    var current_qty = $(this)
      .parent(".current_value")
      .parent(".quantity")
      .parent("form.product-form")
      .children(".qty")
      .val();
    current_qty = parseInt(current_qty);
    if (current_qty != max_quantity) {
      current_qty += 1;
    }
    $(this)
      .parent(".current_value")
      .parent(".quantity")
      .parent("form.product-form")
      .children(".qty")
      .val(current_qty);
    $(this)
      .parent(".current_value")
      .children(".value")
      .text(current_qty + " Bundles");
  });

  $(".bf-collection-addtocart").click(function () {
    console.log("bf collection addtocart");
    var pro_id = $(this).closest("form").find(".product-select").attr("value");
    var qty = $(this).closest("form").find(".qty").val();
    CartJS.addItem(
      pro_id,
      qty,
      { free_gift: true },
      {
        success: function (data, textStatus, jqXHR) {},
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error: " + errorThrown + "!");
        },
      }
    );
  });

  $(document).on("click", ".add_to_cart_upsell", function () {
    var pro_id = $(this).attr("data-product-id");
    var pro_sku = $(this).attr("data-product-sku");
    console.log("Update upsell sku:" + pro_sku);
    var is_flag = false;
    CartJS.cart.items.filter(function (item) {
      if (item.sku == pro_sku) {
        is_flag = true;
      }
    });
    if (!is_flag) {
      CartJS.addItem(
        pro_id,
        1,
        {},
        {
          success: function (data, textStatus, jqXHR) {
            console.log("In cart upsell added");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown + "!");
          },
        }
      );
    }
  });

  $(document).on("click", ".rc_label", function () {
    var pre_upsell_product1 = $("#preCartUpsell1");
    var pre_upsell_product2 = $("#preCartUpsell2");
    var pre_upsell_product3 = $("#preCartUpsell3");
    // check_upsell_product();

    setTimeout(function () {
      if (
        $(".rc_block.rc_block__type__autodeliver").hasClass(
          "rc_block__type--active"
        )
      ) {
        $(".puff-add-to-cart").addClass("cr-ignore");
      } else {
        $(".puff-add-to-cart").removeClass("cr-ignore");
      }
    }, 500);

    $.ajax({
      type: "GET",
      url: "/cart.js",
      cache: false,
      dataType: "json",
      success: function (cart) {
        check_upsell_product();
        // Pre-Upsell
        var total_price = cart.total_price / 100;

        if (
          $(".rc_block.rc_block__type__autodeliver").hasClass(
            "rc_block__type--active"
          )
        ) {
          pre_upsell_product1.addClass("hide--item");
          pre_upsell_product2.addClass("hide--item");
          pre_upsell_product3.removeClass("hide--item");
          pre_upsell_product1
            .find(".onetime_upsell_add")
            .removeClass("is--active");
          pre_upsell_product2
            .find(".onetime_upsell_add")
            .removeClass("is--active");
        } else {
          pre_upsell_product3.addClass("hide--item");
          pre_upsell_product3.find(".sub_upsell_add").removeClass("is--active");
          $(".puff-add-to-cart.non-prepay").removeClass("hide--item");
          $(".puff-add-to-cart.for-prepay").addClass("hide--item");
          if (total_price < 50) {
            pre_upsell_product2.addClass("hide--item");
            pre_upsell_product1.removeClass("hide--item");
          } else {
            pre_upsell_product2.removeClass("hide--item");
            pre_upsell_product1.addClass("hide--item");
          }
        }
      },
    });
  });

  $(document).on("click", ".sub_upsell_add", function (e) {
    $(this).toggleClass("is--active");
    if ($(this).hasClass("is--active")) {
      $(".puff-add-to-cart.non-prepay").addClass("hide--item");
      $(".puff-add-to-cart.for-prepay").removeClass("hide--item");
    } else {
      $(".puff-add-to-cart.non-prepay").removeClass("hide--item");
      $(".puff-add-to-cart.for-prepay").addClass("hide--item");
    }
  });

  // $(document).on("cart.ready", function (event, cart) {
  //   console.log("CartJS ready to use");
  // });

  // $(document).on("cart.requestStarted", function (event, cart) {
  //   console.log("CartJS requestStarted to use");
  // });

  $(document).on("cart.requestComplete", function (event, cart) {
    // console.log("CartJS requestComplete to use");

    check_upsell_product();
  });

  $(".puff-add-to-cart.for-prepay").click(function () {
    var json_data = JSON.parse(
      document.getElementById("prepaid_product_variant__json").innerHTML
    );
    console.log("json_data");
    console.log(json_data);

    var target = $(".product-pre-upsell > div.is--active");

    if (target.hasClass("onetime_upsell_add")) {
      var variant_id = target.attr("data-product-id");
      CartJS.addItem(
        variant_id,
        1,
        {},
        {
          success: function (data, textStatus, jqXHR) {
            target.removeClass("is--active");
            check_upsell_product();
            // updateCartDrawerUI();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown + "!");
          },
        }
      );
    } else if (target.hasClass("sub_upsell_add")) {
      var variant_id = target
        .closest(".product-pre-upsell")
        .attr("data-prod-id");
      var frequency = target.attr("data-product-frequency");
      var unit_type = target.attr("data-product-unit_type");
      CartJS.addItem(
        variant_id,
        1,
        {
          shipping_interval_frequency: frequency,
          shipping_interval_unit_type: unit_type,
        },
        {
          success: function (data, textStatus, jqXHR) {
            $(".header-cart .cart-count").html(CartJS.cart.item_count);
            $(".sub_upsell_add.is--active").removeClass("is--active");
            $(".puff-add-to-cart.non-prepay").removeClass("hide--item");
            $(".puff-add-to-cart.for-prepay").addClass("hide--item");
            check_upsell_product();
            // updateCartDrawerUI();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown + "!");
          },
        }
      );
    }
  });

  $(document).on("click", ".cart-drawer__close", function () {
    if ($("body").hasClass("product-template")) {
      $("#add-to-cart").show();
    }
  });
  $(document).on("click", ".cart-drawer-bg--visible", function () {
    if ($("body").hasClass("product-template")) {
      $("#add-to-cart").show();
    }
  });

  // Puff Add To Cart Button
  $(document).on("click", "#add-to-cart", function () {
    // if($(this).attr("class").indexOf("cr-ignore") == -1) {
    //   localStorage.setItem("add-to-cart", "true");
    // }

    return;
    console.log("add to cart 2021");
    var _productContainer = $(".product-container");
    if (_productContainer.hasClass("scroll")) {
      $(this).hide();
    }

    if (
      $(this).attr("class").indexOf("cr-ignore") == -1 &&
      $(this).attr("class").indexOf("skip-cart") != -1
    )
      localStorage.setItem("add-to-cart", "true");
    if (
      $(".product-container.container").hasClass(
        "free-gift-product-container"
      ) &&
      is_free_gift_product
    ) {
      console.log("Is Gift : " + free_gift_product_id);
      var is_free_gift = false;
      CartJS.cart.items.filter(function (item) {
        if (item.sku == free_gift_product_sku) {
          is_free_gift = true;
        }
      });
      if (!is_free_gift) {
        console.log("adding gift with id " + free_gift_product_id);
        CartJS.addItem(
          free_gift_product_id,
          1,
          {},
          {
            success: function (data, textStatus, jqXHR) {
              console.log("Added!");
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error: " + errorThrown + "!");
            },
          }
        );
      }
    }

    if (
      variantA &&
      !$("#add-to-cart-form")
        .find(".product-option.product-option--bundle:nth-child(4)")
        .hasClass("product-option--selected")
    ) {
      var isLineModalTimer = localStorage.getItem("isLineModalTimer");
      if (isLineModalTimer == "no") startLineTimer();
      $("#puff_line_modal").addClass("is_active");
    } else if (variantB) {
      if (
        $("#add-to-cart-form")
          .find(".product-option.product-option--bundle:nth-child(4)")
          .hasClass("product-option--selected") &&
        $(".rc_block__type__onetime.rc_block__type--active").length > 0
      )
        return;
      var isLineModalTimer = localStorage.getItem("isLineModalTimer");
      if (isLineModalTimer == "no") startLineTimer();
      $("#puff_line_modal").addClass("is_active");
    }

    var best_target = $(".beta-tester-wrap > div.is--active");
    if (best_target.hasClass("onetime_upsell_add")) {
      console.log("Best Upsell Add");
      var variant_id = best_target.attr("data-product-id");
      var length = CartJS.cart.items.length;
      var beta_flag = false;
      for (var i = 0; i < length; i++) {
        if (CartJS.cart.items[i].id == variant_id) beta_flag = true;
      }
      console.log(beta_flag);
      if (beta_flag == false) {
        CartJS.addItem(
          variant_id,
          1,
          {},
          {
            success: function (data, textStatus, jqXHR) {
              check_upsell_product();
              // updateCartDrawerUI();
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error: " + errorThrown + "!");
            },
          }
        );
      }
    }

    var target = $(".product-pre-upsell > div.is--active");

    if (target.hasClass("onetime_upsell_add")) {
      var variant_id = target.attr("data-product-id");
      CartJS.addItem(
        variant_id,
        1,
        {},
        {
          success: function (data, textStatus, jqXHR) {
            target.removeClass("is--active");
            check_upsell_product();
            // updateCartDrawerUI();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown + "!");
          },
        }
      );
    } else if (target.hasClass("sub_upsell_add")) {
      console.log("sub upsell add");
      var variant_id = target
        .closest(".product-pre-upsell")
        .attr("data-prod-id");
      var frequency = target.attr("data-product-frequency");
      var unit_type = target.attr("data-product-unit_type");
      CartJS.addItem(
        variant_id,
        1,
        {
          shipping_interval_frequency: frequency,
          shipping_interval_unit_type: unit_type,
        },
        {
          success: function (data, textStatus, jqXHR) {
            $(".header-cart .cart-count").html(CartJS.cart.item_count);
            $(".sub_upsell_add.is--active").removeClass("is--active");
            $(".puff-add-to-cart.non-prepay").removeClass("hide--item");
            $(".puff-add-to-cart.for-prepay").addClass("hide--item");
            check_upsell_product();
            // updateCartDrawerUI();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown + "!");
          },
        }
      );
    }
  });

  function updateCartDrawerUI() {
    $("body").addClass("cart-loading");
    $.get("/cart?view=drawer", function (data) {
      $("body").removeClass("cart-loading");
      $("body").addClass("cart-drawer-open");

      var newCartEl = $(data);
      $("#shopify-section-cart-drawer").replaceWith(newCartEl);
      $(".cart-drawer").addClass("cart-drawer--visible");
      $(".cart-drawer-bg").addClass("cart-drawer-bg--visible");
      reChargeProcessCart();
      $("#add-to-cart").removeClass("disabled");

      if (localStorage.getItem("utmDiscountCode")) {
        setTimeout(function () {
          if ($(".cart-drawer__action .btn.btn--second.btn--block")) return;
          rechargeCheckoutLink = $(
            ".cart-drawer__action .js-cart-checkout-recharge-btn"
          ).attr("href");
          var remove_after = rechargeCheckoutLink.indexOf("&flashSale=");
          var rechargeCheckoutLinkWithoutSales = rechargeCheckoutLink.substring(
            0,
            remove_after
          );
          $(".cart-drawer__action .js-cart-checkout-recharge-btn").hide();
          $(".cart-drawer__action .js-cart-checkout-recharge-btn").addClass(
            "hide--item"
          );
          $(".cart-drawer__action").append(
            "<a href='' class='btn btn--second btn--block'>Secure Checkout</a>"
          );
          $(".btn--second").attr(
            "href",
            `${rechargeCheckoutLinkWithoutSales.replace(
              "&flashSale=",
              ""
            )}&discount=${localStorage.getItem("utmDiscountCode")}`
          );
        }, 100);
      }
      //check_upsell_product();
    });
  }

  function check_upsell_product() {
    $(".sub_upsell_add.is--active").removeClass("is--active");
    $(".puff-add-to-cart.non-prepay").removeClass("hide--item");
    $(".puff-add-to-cart.for-prepay").addClass("hide--item");

    var pre_upsell_product1 = $("#preCartUpsell1");
    var pre_upsell_product2 = $("#preCartUpsell2");
    var pre_upsell_product3 = $("#preCartUpsell3");

    /*
    var json_data = JSON.parse(document.getElementById('prepaid_product_variant__json').innerHTML);
    var form_prod_handle = $("#add-to-cart-form").attr("data-pro-handle");
    var form_variant_id = 0;
    var is_prepay = false;
    var is_form_pro = false;
    */
    var json_data = JSON.parse(
      document.getElementById("prepaid_product_variant__json").innerHTML
    );

    var pre_upsell_product1 = $("#preCartUpsell1");
    var pre_upsell_product2 = $("#preCartUpsell2");
    var pre_upsell_product3 = $("#preCartUpsell3");

    CartJS.cart.items.filter(function (item) {
      if (
        item.variant_id ==
        pre_upsell_product1.find(".onetime_upsell_add").attr("data-product-id")
      ) {
        $('[data-cart-item-id="' + item.variant_id + '"]')
          .find(".cart-drawer__item-qty")
          .addClass("hide--item");
      }
      if (
        item.variant_id ==
        pre_upsell_product2.find(".onetime_upsell_add").attr("data-product-id")
      ) {
        $('[data-cart-item-id="' + item.variant_id + '"]')
          .find(".cart-drawer__item-qty")
          .addClass("hide--item");
      }
      jQuery.each(json_data, function (key, value) {
        if (value == item.variant_id) {
          $('[data-cart-item-id="' + item.variant_id + '"]')
            .find(".cart-drawer__item-qty")
            .addClass("hide--item");
          var prePayTitle = $("#preCartUpsell3").attr("data-product-title");
          $('[data-cart-item-id="' + item.variant_id + '"]')
            .find(".cart-drawer__item-title")
            .html(prePayTitle);
        }
      });
      /*
      if (item.handle == form_prod_handle) {
        is_form_pro = true;
        form_variant_id = item.variant_id;
      }
      jQuery.each(json_data, function (key, value) {
        if (key == item.variant_title) is_prepay = true;
      });
      */
    });

    //if (is_form_pro && is_prepay) CartJS.removeItemById(form_variant_id);
  }
});

// Apple popup
$(document).on("click", "[data-apple-popup]", function (e) {
  e.preventDefault();
  console.log("applie popup: " + is_apple_pie);
  if (is_apple_pie) {
    $("#apple_modal").addClass("is_active");
    startAppleTimer();
  } else {
    location.href = "/checkout";
  }
});

$(document).on("click", "[data-product-anchor]", function (e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $(".product-container.container")?.offset()?.top,
    },
    800
  );
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if ($(".product-container.container")) {
    if (scroll > $(".product-container.container")?.offset()?.top) {
      $(".hide-on-article")?.show();
    } else {
      $(".hide-on-article")?.hide();
    }
  }
});

$(document).on("click", ".jdgm-preview-badge", function (e) {
  if ($("html").data("template") == "index") {
    $("html, body").animate(
      {
        scrollTop: $(".section--testimonial")?.offset()?.top - 140,
      },
      800
    );
  } else {
    $("html, body").animate(
      {
        scrollTop: $(".section--reviews")?.offset()?.top - 140,
      },
      800
    );
  }
});

$(document).on("click", "[data-anchor-cereal]", function (e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $(".cereal-container")?.offset()?.top,
    },
    800
  );
});

$(document).on("click", "[data-anchor-puffs]", function (e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $(".keto-container")?.offset()?.top,
    },
    800
  );
});

function addOrRemoveBundleItem(isAdd) {
  let count = $(".price[data-item-count]").attr("data-item-count");
  if (isAdd) {
    count++;
  } else {
    count--;
  }

  if (count == 0) {
    $("button.bundle-atc").prop("disabled", true);
  } else {
    $("button.bundle-atc").prop("disabled", false);
  }

  var onetimePrice = Math.round(count * 2999) / 100;

  if (
    $("body").hasClass("product-new-puffs-template") ||
    $("body").hasClass("product-new-cereal-template")
  ) {
    onetimePrice = Math.round(count * 2799) / 100;
  }

  var originalPrice = onetimePrice;

  if (count == 0) {
    $(".bundle-progress-bar").hide();
  } else if (count == 1) {
    $(".bundle-progress-bar").show();
    $(".progress-1").show();
    $(".progress-2").hide();
    $(".progress-3").hide();
    $(".progress-4").hide();
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      $("#upsell-message").html(
        "Almost there! You're $22.39 Away From 10% Off"
      );
    } else {
      $("#upsell-message").html("Almost there! You're $20 Away From 17% Off");
    }
  } else if (count == 2) {
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      onetimePrice = onetimePrice * 0.9;
    } else {
      onetimePrice = onetimePrice * 0.833445;
    }
    $(".bundle-progress-bar").show();
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      $("#upsell-message").html(
        "Almost there! You're $39.59 Away From 20% Off"
      );
    } else {
      $("#upsell-message").html(
        "Almost there! You're $29.99 Away From 25% Off"
      );
    }
    $(".progress-1").hide();
    $(".progress-2").show();
    $(".progress-3").hide();
    $(".progress-4").hide();
  } else if (count == 3) {
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      $("#upsell-message").html("Almost there! You're $14.4 Away From 20% Off");
      $(".progress-1").hide();
      $(".progress-2").hide();
      $(".progress-3").show();
      $(".progress-4").hide();
    } else {
      $("#upsell-message").html("Congratulations! You've Unlocked 25% Off");
      $(".progress-2").hide();
      $(".progress-3").show();
    }
  } else {
    $(".bundle-progress-bar").show();
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      $("#upsell-message").html("Congratulations! You've Unlocked 20% Off!");
      $(".progress-1").hide();
      $(".progress-2").hide();
      $(".progress-3").hide();
      $(".progress-4").show();
    } else {
      $("#upsell-message").html("Congratulations! You've Unlocked 25% Off");
      $(".progress-1").hide();
      $(".progress-2").hide();
      $(".progress-3").show();
      $(".progress-4").hide();
    }

    if ($(".subscription-switch").is(":checked")) {
      if (
        $("body").hasClass("product-new-puffs-template") ||
        $("body").hasClass("product-new-cereal-template")
      ) {
        $(".perbag-label").html("(Only $1.68 per bag)");
      } else {
        $(".perbag-label").html("(Only $1.68 per bag)");
      }
    } else {
      if (
        $("body").hasClass("product-new-puffs-template") ||
        $("body").hasClass("product-new-cereal-template")
      ) {
        $(".perbag-label").html("(Only $1.87 per bag)");
      } else {
        $(".perbag-label").html("(Only $1.87 per bag)");
      }
    }
  }
  if (count == 3) {
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      onetimePrice = onetimePrice * 0.9;
    } else {
      onetimePrice = onetimePrice * 0.829994;
    }
  }
  if (count >= 4) {
    if (
      $("body").hasClass("product-new-puffs-template") ||
      $("body").hasClass("product-new-cereal-template")
    ) {
      onetimePrice = onetimePrice * 0.8;
    } else {
      onetimePrice = onetimePrice * 0.75;
    }
  }

  onetimePrice = Math.round(onetimePrice * 100) / 100;

  originalPrice = Math.round(originalPrice * 100) / 100;

  var subscriptionPrice = Math.round(onetimePrice * 87.5) / 100;

  if (subscriptionPrice == 81.35) {
    subscriptionPrice = 81.36;
  } else if (subscriptionPrice == 69.54) {
    subscriptionPrice = 69.57;
  } else if (subscriptionPrice == 46.36) {
    subscriptionPrice = 46.38;
  } else if (subscriptionPrice == 78.37) {
    subscriptionPrice = 78.36;
  }

  if (onetimePrice == 89.57) {
    onetimePrice = 89.56;
  }

  $(".price[data-item-count]").attr("data-item-count", count);

  $(".price .old-price").html("$" + onetimePrice);

  if ($(".subscription-switch:visible").is(":checked")) {
    console.log("update price");
    $(".price .current-price").html("$" + subscriptionPrice);
    if (count > 0) {
      $(".perbag-label").html(
        "(Only $" +
          Math.round((onetimePrice * 87.5) / 12 / count) / 100 +
          " per bag)"
      );
    }
    $(".current-price").show();
    $(".old-price").addClass("slash");
    $(".subscription-toggle").addClass("bold");
  } else {
    if (onetimePrice == originalPrice) {
      $(".price .current-price").html("$" + onetimePrice);
      $(".current-price").hide();
      $(".old-price").removeClass("slash");
    } else {
      $(".price .old-price").html("$" + originalPrice);
      $(".price .current-price").html("$" + onetimePrice);
      $(".current-price").show();
      $(".old-price").addClass("slash");
    }

    $(".subscription-toggle").removeClass("bold");
    if (count > 0) {
      $(".perbag-label").html(
        "(Only $" +
          Math.round((onetimePrice * 100) / 12 / count) / 100 +
          " per bag)"
      );
    }
  }
}

$(document).on("click", ".variant-add-btn", function (e) {
  e.preventDefault();
  $(this).closest(".variant-item").addClass("active");
  $(".bottom-bar").removeClass("initial");
  $(".bottom-bar").show();
  $(".btn-initial-desktop").hide();
  $("#shopify-section-product-upper-cereal-bundle .product-container").addClass(
    "after-select"
  );
  $(".product-new-cereal-template").addClass("left-align");
  addOrRemoveBundleItem(true);
});

$(document).on("click", "[data-bundle-qty-plus]", function (e) {
  e.preventDefault();
  const $qtyInput = $(this).closest(".current_value").find(".value");
  const count = parseInt($qtyInput.attr("data-bundle-qty-value")) + 1;
  if (count == 1) {
    $qtyInput.html(count + " Case");
  } else {
    $qtyInput.html(count + " Cases");
  }
  $qtyInput.attr("data-bundle-qty-value", count);
  addOrRemoveBundleItem(true);
});

$(document).on("click", "[data-bundle-qty-minus]", function (e) {
  e.preventDefault();
  const $qtyInput = $(this).closest(".current_value").find(".value");
  const count = parseInt($qtyInput.attr("data-bundle-qty-value")) - 1;
  addOrRemoveBundleItem(false);
  if (count == 0) {
    $(this).closest(".variant-item").removeClass("active");
    $qtyInput.html("1 Case");
    $qtyInput.attr("data-bundle-qty-value", 1);
    return;
  }
  $qtyInput.html(count + " Case");
  $qtyInput.attr("data-bundle-qty-value", count);
});

$(document).on("click", ".subscription-switch", function (e) {
  addOrRemoveBundleItem(true);
  addOrRemoveBundleItem(false);
});

$(document).on("click", ".jdgm-preview-badge", function (e) {
  $("html, body").animate(
    {
      scrollTop: $(".section--reviews")?.offset()?.top - 140,
    },
    800
  );
});

$(document).on("scroll", function (e) {
  if ($("body").attr("id") != "bundle-builder-id") {
    return;
  }
  const $element = $(
    "#shopify-section-keto-variants-section .variant-item:first-child .variant-add-btn"
  );
  var top_of_element = $element?.offset()?.top;
  var bottom_of_element = $element?.offset()?.top + $element.outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();

  if (bottom_of_screen > bottom_of_element && top_of_screen < top_of_element) {
    $(".bottom-bar.hide--desktop").show();
  }

  const $element2 = $(
    "#shopify-section-keto-variants-section .variant-item:first-child .quantity"
  );
  var top_of_element = $element2?.offset()?.top;
  var bottom_of_element = $element2?.offset()?.top + $element2.outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();

  if (bottom_of_screen > bottom_of_element && top_of_screen < top_of_element) {
    $(".bottom-bar.hide--desktop").show();
  }
});

$(document).on("click", ".why-us-section .btn_read_more", function (e) {
  e.preventDefault();
  const $parentSection = $(this).closest(".block-item");
  if ($(window).width() <= 768) {
    $parentSection.find(".block-subtitle .less_content").slideDown();
  }
  $parentSection.find(".block-subtitle .more_content").slideDown();
  $parentSection.find(".btn_read_less").show();
  $(this).hide();
});

$(document).on("click", ".why-us-section .btn_read_less", function (e) {
  e.preventDefault();
  const $parentSection = $(this).closest(".block-item");
  if ($(window).width() <= 768) {
    $parentSection.find(".block-subtitle .less_content").slideUp();
  }
  $parentSection.find(".block-subtitle .more_content").slideUp();
  $parentSection.find(".btn_read_more").show();
  $(this).hide();
});

$(document).on("click", ".btn-initial", function (e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $(".bundle-variants-container")?.offset()?.top - 140,
    },
    800
  );
});

$(document).on(
  "click",
  "[data-oke-reviews-product-listing-rating]",
  function (e) {
    if ($("html").data("template") == "index") {
      $("html, body").animate(
        {
          scrollTop: $(".section--testimonial")?.offset()?.top - 140,
        },
        800
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: $(".section--reviews")?.offset()?.top - 140,
        },
        800
      );
    }
  }
);

$(document).on("click", ".ytlander-section .btn", function (e) {
  if (
    $("body").hasClass("article-miss-bbq1-template") ||
    $("body").hasClass("article-miss-cream-template") ||
    $(this).hasClass("no-offset")
  ) {
    return;
  }

  if ($("body").hasClass("page-ytlander-puffs2-template")) {
    $("html, body").animate(
      {
        scrollTop: $(".product-header__reviews")?.offset()?.top - 120,
      },
      800
    );
  } else if ($("body").hasClass("product-cereal-free-template")) {
    $(".puff-add-to-cart:last-child").trigger("click");
  } else if ($("body").hasClass("article-miss-cream2-template")) {
    $("html, body").animate(
      {
        scrollTop: $(".product-option-row")?.offset()?.top - 120,
      },
      800
    );
  } else {
    if ($(window).width() > 768) {
      $("html, body").animate(
        {
          scrollTop: $(".product-header__reviews")?.offset()?.top - 40,
        },
        800
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: $(".product-header__description-top")?.offset()?.top - 120,
        },
        800
      );
    }
  }
});

$(document).on("click", ".scroll-to-top", function (e) {
  e.preventDefault();
  if ($("body").hasClass("page-ytlander-puffs2-template")) {
    $("html, body").animate(
      {
        scrollTop: $(".product-header__reviews")?.offset()?.top - 120,
      },
      800
    );
  } else {
    $("html, body").animate(
      {
        scrollTop: $(".product-header__reviews")?.offset()?.top - 40,
      },
      800
    );
  }
});

$(document).on("click", ".ytlander-section .review-link", function (e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $(".section--reviews")?.offset()?.top - 140,
    },
    800
  );
});

$(document).on("click", ".ytlander-section a", function (e) {
  if (
    $("body").hasClass("article-miss-bbq1-template") ||
    $("body").hasClass("article-miss-cream-template")
  ) {
    return;
  }

  e.preventDefault();
  if ($(this).attr("href") == "#top") {
    if ($("body").hasClass("page-ytlander-puffs2-template")) {
      $("html, body").animate(
        {
          scrollTop: $(".product-header__reviews")?.offset()?.top - 120,
        },
        800
      );
    } else if ($("body").hasClass("product-cereal-free-template")) {
      $(".puff-add-to-cart:last-child").trigger("click");
    } else {
      $("html, body").animate(
        {
          scrollTop: $(".product-header__reviews")?.offset()?.top - 40,
        },
        800
      );
    }
  } else if ($(this).attr("href") == "#ingredients") {
    if ($(window).width() > 768) {
      const fancybox = new Fancybox([
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/sour_cream_b72c299c-e1b6-4c42-aeed-f741cf7561a9.png?v=1632747165",
          type: "image",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/fiery.png?v=1632747165",
          type: "image",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/bbq_cb1cc702-f4fa-4904-b247-9ce0199b25b9.png?v=1632747166",
          type: "image",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/cheddar_a5e21d4c-e941-40bd-805c-fb4cf485d7ef.png?v=1632747165",
          type: "image",
        },
      ]);
    } else {
      const fancybox = new Fancybox([
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/sour_cream_27562b47-0a8b-41b9-9c4f-44deef6a061c.png?v=1632747267",
          type: "image",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/fiery_8e469471-3c14-4572-920f-c0de0e1a1ea4.png?v=1632747267",
          type: "image",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/cheddar_edc791e9-f48f-430b-82d6-f2fd3981afac.png?v=1632747267",
          type: "image",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/0048/4330/7123/files/bbq_df487028-4cef-4eb4-80e5-8a7e1f15a4d8.png?v=1632747267",
          type: "image",
        },
      ]);
    }
  } else if ($(this).attr("href") == "/products/keto-puffs") {
    $(this).attr("href", "#");
    $("html, body").animate(
      {
        scrollTop: $(".product-option-row")?.offset()?.top - 120,
      },
      800
    );
  }
});

$(document).on(
  "click",
  ".product-option--variant1, .product-option--variant2-1",
  function (e) {
    e.preventDefault();

    $(
      ".product-options--bundles .product-option:first-child .single-option-select"
    ).trigger("click");

    setTimeout(() => {
      $(".product-options--bundles .product-option").removeClass(
        "product-option--selected"
      );
      $(this).addClass("product-option--selected");
      $(".product-option-row--flavor .option-name").html("Flavors Included");
      $(".product-option-row--flavor").css("pointer-events", "none");
      $(".product-option-row--flavor .product-option").addClass(
        "product-option--selected"
      );
      $(".product-option-row--flavor .product-option:last-child").removeClass(
        "product-option--selected"
      );
      $(".puff-add-to-cart").addClass("hide");
      $(".btn-atc-variant2").hide();
      $(".btn-atc-variant1").show();
      $(".product-option-row---sweet-salty").hide();
      $(".product-option-row--flavor").show();
    }, 100);
  }
);

$(document).on("click", ".product-option--variant2-2", function (e) {
  e.preventDefault();

  $(
    ".product-options--bundles .product-option:first-child .single-option-select"
  ).trigger("click");

  setTimeout(() => {
    $(".product-options--bundles .product-option").removeClass(
      "product-option--selected"
    );
    $(this).addClass("product-option--selected");
    $(".product-option-row--flavor .option-name").html("Flavors Included");
    $(".product-option-row--flavor").css("pointer-events", "none");
    $(".product-option-row---sweet-salty .product-option").addClass(
      "product-option--selected"
    );
    $(".puff-add-to-cart").addClass("hide");
    $(".btn-atc-variant2").show();
    $(".btn-atc-variant1").hide();
    $(".product-option-row---sweet-salty").show();
    $(".product-option-row--flavor").hide();
  }, 100);
});

$(document).on("click", ".product-option--bundle", function (e) {
  if (
    $(this).hasClass("product-option--variant1") ||
    $(this).hasClass("product-option--variant2-1") ||
    $(this).hasClass("product-option--variant2-2")
  ) {
    return;
  }

  $(".product-option-row--flavor .option-name").html("2. Choose Flavors:");
  $(".product-option-row--flavor").css("pointer-events", "auto");
  $("button.puff-add-to-cart").removeClass("hide");
  $(".btn-extra-atc").hide();
  $(".product-option-row---sweet-salty").hide();
  $(".product-option-row--flavor").show();
});

$(document).on("click", ".product-option-qty .product-option", function (e) {
  $(".product-option-qty .product-option").removeClass(
    "product-option--selected"
  );
  $(this).addClass("product-option--selected");

  const variantId = $(this).data("variant-id");
  const variantQty = $(this).data("variant-qty");

  if ($("body").hasClass("product-dough-template")) {
    if (variantId == "39735705829464") {
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$34.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantId == "39735728635992") {
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$14.00!");
      $(".discount-block .compare-price").html("$69.98");
      $(".discount-block .current-price").html("$55.98");
    } else {
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$34.99!");
      $(".discount-block .compare-price").html("$139.96");
      $(".discount-block .current-price").html("$104.97");
    }
  } else if ($("body").hasClass("product-max-sweet-template")) {
    if (variantQty == "1") {
      $(".discount-block .left-content").css("opacity", "0");
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$49.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantQty == "2") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$9.99");
      $(".discount-block .compare-price").html("$99.98");
      $(".discount-block .current-price").html("$89.98");
    } else {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$29.99");
      $(".discount-block .compare-price").html("$199.96");
      $(".discount-block .current-price").html("$169.97");
    }
  } else if (
    $("body").hasClass("product-pasta-template") ||
    $("body").hasClass("product-keto-bread-template")
  ) {
    if (variantQty == "1") {
      $(".discount-block .left-content").css("opacity", "0");
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$39.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantQty == "2") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$8");
      $(".discount-block .compare-price").html("$79.98");
      $(".discount-block .current-price").html("$71.98");
    } else if (variantQty == "4") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$24");
      $(".discount-block .compare-price").html("$159.96");
      $(".discount-block .current-price").html("$135.96");
    }
  } else if (
    $("body").hasClass("product-cracker-template") ||
    $("body").hasClass("product-cracker-popup-template")
  ) {
    if (variantQty == "1") {
      $(".discount-block .left-content").css("opacity", "0");
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$59.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantQty == "2") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$11.99");
      $(".discount-block .compare-price").html("$119.98");
      $(".discount-block .current-price").html("$107.98");
    } else {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$35.99");
      $(".discount-block .compare-price").html("$239.96");
      $(".discount-block .current-price").html("$203.97");
    }
  } else if ($("body").hasClass("product-pink-panda-template")) {
    if (variantQty == "1") {
      $(".discount-block .left-content").css("opacity", "0");
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$44.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantQty == "2") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$9");
      $(".discount-block .compare-price").html("$89.98");
      $(".discount-block .current-price").html("$80.98");
    } else {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$26.99");
      $(".discount-block .compare-price").html("$179.96");
      $(".discount-block .current-price").html("$152.97");
    }
  } else if ($("body").hasClass("product-dees-template")) {
    if (variantQty == "1") {
      $(".discount-block .left-content").css("opacity", "0");
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$49.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantQty == "2") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$10");
      $(".discount-block .compare-price").html("$99.98");
      $(".discount-block .current-price").html("$89.98");
    } else {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$29.99");
      $(".discount-block .compare-price").html("$199.96");
      $(".discount-block .current-price").html("$169.97");
    }
  } else if ($("body").hasClass("product-prevail-template")) {
    if (variantQty == "1") {
      $(".discount-block .left-content").css("opacity", "0");
      $(".discount-block .save-amount").html("$0");
      $(".discount-block .current-price").html("$49.99");
      $(".discount-block .compare-price").css("opacity", "0");
    } else if (variantQty == "2") {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$10");
      $(".discount-block .compare-price").html("$99.98");
      $(".discount-block .current-price").html("$89.98");
    } else {
      $(".discount-block .left-content").css("opacity", "1");
      $(".discount-block .compare-price").css("opacity", "1");
      $(".discount-block .save-amount").html("$29.99");
      $(".discount-block .compare-price").html("$199.96");
      $(".discount-block .current-price").html("$169.97");
    }
  }
});

document.addEventListener("candyrack-mounted", () => {
  if (
    $(".rc_block.rc_block__type__autodeliver").hasClass(
      "rc_block__type--active"
    )
  ) {
    $(".puff-add-to-cart").addClass("cr-ignore");
  } else {
    $(".puff-add-to-cart").removeClass("cr-ignore");
  }
});

// $(document).on("click", ".ik-sample-pack", function (e) {
//   e.preventDefault();
//   var link = $(this).attr("data-href");
//   console.log("link", link);
//   $(".ik-normal-pack")[0].click();
//   setTimeout(function() {
//     location.href = link;
//   }, 3000);
// })

$(document).on("click", ".family-size-button", function (e) {
  console.log(".family-size-button");
  if ($("body").hasClass("product-family-size-template")) return;
  window.location.href =
    "https://schoolyardsnacks.com/products/keto-cheese-puffs-6-family-size-bags";
});

$(document).on("click", ".cereal-box-button", function (e) {
  if ($("body").hasClass("product-cereal-box-template")) return;
  window.location.href =
    "https://schoolyardsnacks.com/products/keto-cereal-6-boxes?view=cereal_box";
});

$(document).on("click", ".default-puffs-button", function (e) {
  console.log(".default-puffs-button");
  if (
    $("body").hasClass("product-growltv-template") &&
    $("body").hasClass("keto-puffs")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/keto-puffs";
});

$(document).on("click", ".default-puffs-button", function (e) {
  console.log(".default-puffs-button");
  if (
    $("body").hasClass("product-one-template") &&
    $("body").hasClass("keto-puffs")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/keto-puffs";
});

$(document).on("click", ".default-puffs-button", function (e) {
  console.log(".default-puffs-button");
  if (
    $("body").hasClass("product-one-pb-template") &&
    $("body").hasClass("keto-puffs")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/keto-puffs";
});

$(document).on("click", ".default-puffs-button", function (e) {
  console.log(".default-puffs-button");
  if (
    $("body").hasClass("product-one-co-template") &&
    $("body").hasClass("keto-puffs")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/keto-puffs";
});

$(document).on("click", ".default-cereals-button", function (e) {
  if (
    $("body").hasClass("product-growltv-template") &&
    $("body").hasClass("cereal")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/cereal";
});

$(document).on("click", ".default-cereals-button", function (e) {
  if (
    $("body").hasClass("product-one-template") &&
    $("body").hasClass("cereal")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/cereal";
});

$(document).on("click", ".default-cereals-button", function (e) {
  if (
    $("body").hasClass("product-one-pb-template") &&
    $("body").hasClass("cereal")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/cereal";
});

$(document).on("click", ".default-cereals-button", function (e) {
  if (
    $("body").hasClass("product-one-co-template") &&
    $("body").hasClass("cereal")
  )
    return;
  window.location.href = "https://schoolyardsnacks.com/products/cereal";
});
// $(document).on("click", ".default-cereals-button", function (e) {
//   if (
//     $("body").hasClass("product-one-co-template") &&
//     $("body").hasClass("cereal")
//   )
//     return;
//   window.location.href =
//     "https://schoolyardsnacks.com/products/cereal?view=cereal_no_redirect";
// });

$(document).on(
  "click",
  ".growltv-options-group:nth-child(2) .growltv-options-group__option",
  function (e) {
    priceSwap();
  }
);

$(document).on("click", ".header-cart a", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (document.readyState !== "complete") {
    console.log("not loaded");
  } else {
    console.log("loading comleted ");
  }
});

// $(document).on("click", ".subscription-direct-checkout", function(e){
//   e.preventDefault();

// });

$(document).on("click", ".btn-unlock-offer", function (e) {
  $("html, body").animate(
    {
      scrollTop: $(".growltv-product-form").offset().top - 120,
    },
    800
  );
});

$(document).ready(function () {
  if (
    $("body").hasClass("product-one-template") ||
    $("body").hasClass("product-one-pb-template") ||
    $("body").hasClass("product-one-co-template") ||
    $("body").hasClass("product-family-one-template")
  ) {
    setTimeout(function () {
      $(
        ".growltv-options-group__options.bundle-selection .growltv-options-group__option:last-child"
      ).click();

      $(
        ".subscription-option .growltv-options-group__option:last-child"
      ).click();
    }, 2000);
  }

  if ($("body").hasClass("product-cereal-no-redirect-template")) {
    setTimeout(function () {
      $(
        ".growltv-options-group__options.subscription-option .growltv-options-group__option:last-child"
      ).click();
    }, 2000);
  }

  if (
    $("body").hasClass("product-growltv-template") &&
    $("body").hasClass("cereal")
  ) {
    setTimeout(function () {
      $(
        ".growltv-options-group__options.subscription-option .growltv-options-group__option:nth-child(4)"
      ).click();
    }, 2000);
  }

  if ($("body").hasClass("product-cereal-box-template")) {
    setTimeout(function () {
      $(
        ".growltv-options-group__options.subscription-option .growltv-options-group__option:nth-child(3)"
      ).click();
    }, 2000);
  }

  if ($("body").hasClass("product-one-co-template")) {
    setTimeout(function () {
      $(
        ".growltv-options-group__options.growltv-options-flavor .growltv-options-group__option:nth-child(4) input"
      ).click();
    }, 4000);
  }

  if (
    $("body").hasClass("product-growltv-template") ||
    $("body").hasClass("product-one-template") ||
    $("body").hasClass("product-one-pb-template") ||
    $("body").hasClass("product-one-co-template") ||
    $("body").hasClass("product-template")
  ) {
    priceSwap();
    if ($(".sold-in-number")) {
      // var productId = {{ product.id }};
      var soldInNum = null;
      if (!soldInNum) {
        console.log("###getRandomInt: " + soldInNum);
        if (
          $("body").hasClass("product-nunbelievable-template") ||
          $("body").hasClass("product-nunbelievable-popup-template")
        ) {
          function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          soldInNum = getRandomInt(51, 89);
        } else {
          soldInNum = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
        }
        // localStorage.setItem(productId + "SoldInNum", soldInNum);
      }
      console.log("custom.js==>>>sold in number: " + soldInNum);
      $(".product__part--form .sold-in-number").html(soldInNum);
    }
  }

  if ($("body").hasClass("product-nunbelievable-template")) {
    updateCookiePrice();
    setTimeout(function () {
      $(
        ".product-nunbelievable-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
    }, 1000);
  }

  if ($("body").hasClass("product-keto-krisp-template")) {
    updateCookiePrice();
    setTimeout(function () {
      $(
        ".product-keto-krisp-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
    }, 1000);
  }

  if ($("body").hasClass("product-nunbelievable-popup-template")) {
    updateCookiePrice();
    setTimeout(function () {
      $(
        ".product-nunbelievable-popup-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
    }, 1000);
  }
  if ($("body").hasClass("product-tt-page-a-template")) {
    setTimeout(function () {
      $(
        ".product-tt-page-a-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
    }, 1000);
  }
  if ($("body").hasClass("product-tt-page-b-template")) {
    setTimeout(function () {
      $(
        ".product-tt-page-b-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
      $(
        ".product-tt-page-b-template .growltv-product-form .growltv-options-group__name"
      )
        .last()
        .html("Choose flavor (12 bags)");
    }, 1000);
  }

  if ($("body").hasClass("product-subscription-only1-template")) {
    setTimeout(function () {
      $(
        ".product-subscription-only1-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
      $(".growltv-option-choose-flavor").html("Choose Flavor");
    }, 1000);
  }
  if ($("body").hasClass("product-subscription-only2-template")) {
    setTimeout(function () {
      $(
        ".product-subscription-only2-template .growltv-options-group__options-bundle .growltv-options-group__option"
      )
        .last()[0]
        .click();
      $(
        ".growltv-options-group:nth-child(3) .growltv-options-group__name"
      ).html("Choose Flavor");
    }, 1000);
  }

  // if($("body").hasClass("product-family-size-template")) {
  //   setTimeout(function(){
  //     $(".growltv-options-group.flavor-option .growltv-options-group__options .growltv-options-group__option:nth-child(3) label").click();
  //     setTimeout(function(){
  //       $(".growltv-options-group.flavor-option .growltv-options-group__options .growltv-options-group__option:nth-child(4) label").click();
  //     }, 1000);
  //   }, 2000);
  // }
});

function priceSwap() {
  setTimeout(function () {
    var ikprice = $(".ikprice")?.html();
    if (ikprice == "$47.5") $(".ikprice")?.html("$47.50");
  }, 2000);
}

function updateCookiePrice() {
  setTimeout(function () {
    var bundleText = $(
      ".growltv-options-group__options.growltv-options-group__options-bundle"
    )
      .find(
        ".growltv-options-group__option.growltv-options-group__option--selected .growltv-options-group__option-title"
      )
      .text();
    console.log("bundleText: ", bundleText);
    if (bundleText == "4 Flavors - 24 bags") {
      $(".cookie-form-text-wrap .cookie-text span").html("$5.66");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("$159.96");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$135.97");
    } else if (bundleText == "2 Flavors - 12 bags") {
      $(".cookie-form-text-wrap .cookie-text span").html("$5.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("$79.98");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$71.98");
    } else if (bundleText == "1 Flavor - 12 bags") {
      $(".cookie-form-text-wrap .cookie-text span").html("$5.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("$79.98");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$71.98");
    } else if (bundleText == "1 Flavor - 6 bags") {
      $(".cookie-form-text-wrap .cookie-text span").html("$6.65");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$39.99");
    }

    if (bundleText == "4 Flavors - 48 bars") {
      $(".cookie-form-text-wrap .cookie-text span").html("$2.55");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("$143.96");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$122.36");
      $(".cookie-form-text-wrap .price-wrap .slashprice").show();
    } else if (
      bundleText == "2 Flavors - 24 bars" ||
      bundleText == "1 Flavor - 24 bars"
    ) {
      $(".cookie-form-text-wrap .cookie-text span").html("$2.69");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("$71.08");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$64.78");
      $(".cookie-form-text-wrap .price-wrap .slashprice").show();
    } else if (bundleText == "1 Flavor - 12 bars") {
      $(".cookie-form-text-wrap .cookie-text span").html("$2.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$35.99");
    }
  }, 100);
}

function updatePastaPrice() {
  setTimeout(function () {
    var bundleText = $(
      ".growltv-options-group__options.growltv-options-group__options-bundle"
    )
      .find(
        ".growltv-options-group__option.growltv-options-group__option--selected .growltv-options-group__option-title"
      )
      .text();
    console.log("bundleText: ", bundleText);
    if (bundleText == "3 Flavors - 12 boxes") {
      $(".cookie-form-text-wrap .cookie-text span").html("$8.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("$119.97");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$107.98");
    } else if (bundleText == "2 Flavors - 8 boxes") {
      $(".cookie-form-text-wrap .cookie-text span").html("$9.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$79.98");
    } else if (bundleText == "1 Flavor - 8 boxes") {
      $(".cookie-form-text-wrap .cookie-text span").html("$9.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$79.98");
    } else if (bundleText == "1 Flavor - 4 boxes") {
      $(".cookie-form-text-wrap .cookie-text span").html("$9.99");
      $(".cookie-form-text-wrap .price-wrap .slashprice").html("");
      $(".cookie-form-text-wrap .price-wrap .price strong").html("$39.99");
    }
  }, 100);
}

$(document).on(
  "click",
  ".jdgm-widget, .jdgm-widget div, .jdgm-widget span",
  function (e) {
    e.preventDefault();
    console.log("jdgm-widget click event");
    if (
      $(this)
        ?.closest(".homepage-slider")
        ?.find(".section__header h2")
        .text() == "Our Cereal"
    ) {
      // window.location.href = "/products/cereal";
    } else {
      // window.location.href = "/products/keto-puffs";
    }
  }
);

$(document).on(
  "click",
  ".product-nunbelievable-template .growltv-options-group__options-bundle > .growltv-options-group__option",
  function (e) {
    e.preventDefault();
    updateCookiePrice();
  }
);

$(document).on(
  "click",
  ".product-nunbelievable-popup-template .growltv-options-group__options-bundle > .growltv-options-group__option",
  function (e) {
    e.preventDefault();
    updateCookiePrice();
  }
);

$(document).on(
  "click",
  ".product-keto-krisp-template .growltv-options-group__options-bundle > .growltv-options-group__option",
  function (e) {
    e.preventDefault();
    updateCookiePrice();
  }
);

$(document).on(
  "click",
  ".product-pasta-template .growltv-options-group__options-bundle > .growltv-options-group__option",
  function (e) {
    e.preventDefault();
    updatePastaPrice();
  }
);

$(document).on(
  "click",
  ".product-keto-bread-template .growltv-options-group__options-bundle > .growltv-options-group__option",
  function (e) {
    e.preventDefault();
    updatePastaPrice();
  }
);

//btn-max-sweet-atc
$(document).on("click", ".btn-max-sweet-atc", function (e) {
  e.preventDefault();
  // const variantID = $(this).data('product-id');
  const variantID = $(".product-option-qty .product-option--selected").data(
    "variant-id"
  );
  const variantQty = $(".product-option-qty .product-option--selected").data(
    "variant-qty"
  );
  $.get("/cart.js", {}).done(function (response) {
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: {
        quantity: variantQty,
        id: variantID,
      },
      dataType: "json",
      success: function (data) {
        console.log("add to cart success");
      },
    });
  });
});

$(document).on("click", ".variant-item .nutrition-facts", function (e) {
  if ($(window).width() > 768) {
    const fancybox = new Fancybox([
      {
        src: $(this).data("nutrition-image"),
        type: "image",
      },
    ]);
  } else {
    const fancybox = new Fancybox([
      {
        src: $(this).data("nutrition-mob-image"),
        type: "image",
      },
    ]);
  }
});

$(document).on("click", ".variants-tab .tab-header", function (e) {
  $(".variants-tab .tab-header").removeClass("active");
  $(this).addClass("active");
  const tag = $(this).data("tag");
  if (tag == "sweet") {
    $(".variant-item").hide();
    $(".variant-item[data-sweet]").show();
  } else if (tag == "salty") {
    $(".variant-item").hide();
    $(".variant-item[data-salty]").show();
  } else {
    $(".variant-item").show();
  }
});

$(document).on("click", ".variant-item .qtyplus", function (e) {
  const qtyInput = $(this).closest(".qty").find("input");
  const bagsCount = $(this).closest(".variant-item").find(".bags-count");
  const qty = parseInt(qtyInput.val()) + 1;
  qtyInput.val(qty);
  bagsCount.html(
    parseInt(bagsCount.data("bag-count")) * qty + " " + bagsCount.data("unit")
  );
});

$(document).on("click", ".variant-item .qtyminus", function (e) {
  const qtyInput = $(this).closest(".qty").find("input");
  const bagsCount = $(this).closest(".variant-item").find(".bags-count");
  const qty = parseInt(qtyInput.val()) - 1;
  if (qty > 0) {
    qtyInput.val(qty);
    bagsCount.html(
      parseInt(bagsCount.data("bag-count")) * qty + " " + bagsCount.data("unit")
    );
  }
});

$(document).on("click", ".btn-quick-atc", function (e) {
  const variantId = $(this).closest(".variant-item").data("variant-id");
  const qty = $(this).closest(".variant-item").find("input").val();

  jQuery.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: {
      id: variantId,
      quantity: qty,
    },
    success: function () {
      console.log("success");
      document.querySelector(".header-cart a").click();
    },
    dataType: "json",
  });
});
