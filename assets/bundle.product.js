window.REBASE = window.REBASE || {};
REBASE.theme = REBASE.theme || {};

(function () {
  function changeTimezone(date, ianatz) {
    var invdate = new Date(
      date.toLocaleString("en-US", {
        timeZone: ianatz,
      })
    );

    var diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() + diff);
  }

  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    var hours = hrs + " hr";
    var minutes = mins + " min";
    var output = "";
    if (hrs >= 24) {
      return "24 hours";
    }
    if (hrs > 0) {
      output = hours;
    }
    if (hrs > 0 && mins > 0) {
      output = output + ", ";
    }
    if (mins > 0) {
      output = output + minutes;
    }
    return output;
  }

  function ordinalSuffixOf(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return "st";
    }
    if (j == 2 && k != 12) {
      return "nd";
    }
    if (j == 3 && k != 13) {
      return "rd";
    }
    return "th";
  }

  function addZipCode(zipCode) {
    return (
      ' Ship to: <strong id="zipcode">' +
      zipCode +
      '</strong> <a href="#" id="change-zipcode">Change Zip</a><input name="zipcode-input" id="zipcode-input" class="visually-hidden" value="' +
      zipCode +
      '"/><a href="#" id="save-zipcode" class="visually-hidden">Update</a>'
    );
  }

  function returningUser() {
    console.log("returning user function");
    var returningUserDate = localStorage.getItem("returningUser");
    var today = new Date();
    if (returningUserDate) {
      returningUserDate = new Date(returningUserDate);
      // allow for a 24 hour buffer
      return today >= returningUserDate;
    } else {
      today.setHours(today.getHours() + 24);
      localStorage.setItem("returningUser", today.toISOString());
      return false;
    }
  }

  function showOrderWithinMessage() {
    console.log("order message --------------");
    if (returningUser()) {
      return;
    }

    // console.log('order message returning use no--------------');

    var then = new Date();
    then.setHours(24, 0, 0, 0);
    then = changeTimezone(then, "America/Los_Angeles");

    var orderBy = msToTime(then - new Date());
    var today = new Date();
    var businessDays = 2;
    today.setDate(today.getDate() + businessDays);
    if (today.toDateString().includes("Sat")) {
      today.setDate(today.getDate() + 2);
    }
    if (today.toDateString().includes("Sun")) {
      today.setDate(today.getDate() + 1);
    }
    var newDateTimeFormat = new Intl.DateTimeFormat("en", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    deliveryDay = newDateTimeFormat.format(today);
    var deliveryDayNum = deliveryDay.split(" ")[2];
    var receiveBy = deliveryDay + ordinalSuffixOf(deliveryDayNum);

    var geoInfo = localStorage.getItem("Fomo.geocodeResponse");
    if (!geoInfo) {
      return;
    }

    geoInfo = JSON.parse(geoInfo);
    var zipCode = localStorage.getItem("zipCodeInUS") || geoInfo.zip_code;
    if (geoInfo.country_code != "US") {
      return;
    }

    var output =
      '<div id="product-order-by" style="text-align: center"><p>Get it by <strong id="receive-by">' +
      receiveBy +
      "</strong> Order within " +
      orderBy +
      "." +
      addZipCode(zipCode) +
      "</p></div>";

    $("#add-to-cart").before(output);
    $("body").on("click", "#change-zipcode", function (e) {
      e.preventDefault();
      console.log("zipCode clicked");
      $("#zipcode").addClass("visually-hidden");
      $("#change-zipcode").addClass("visually-hidden");
      $("#zipcode-input").removeClass("visually-hidden");
      $("#save-zipcode").removeClass("visually-hidden");
    });
    $("body").on("click", "#save-zipcode", function (e) {
      e.preventDefault();
      console.log("zipCode clicked");
      $("#change-zipcode").removeClass("visually-hidden");
      $("#zipcode-input").addClass("visually-hidden");
      $("#save-zipcode").addClass("visually-hidden");
      localStorage.setItem("zipCodeInUS", $("#zipcode-input").val());
      $("#zipcode")
        .html($("#zipcode-input").val())
        .removeClass("visually-hidden");
    });
  }

  function onDOMLoaded() {
    console.log("DOM load------------------------");
    var currentSelectedFlavors;
    var defaultBundleInput = $(
      ".product-option--bundle.product-option--selected input"
    );
    // var defaultFlavors = [];

    REBASE.theme.product_photo_gallery = new Swiper(
      ".gallery.swiper-container",
      {
        effect: "slide",
        loop: true,
        speed: 300,
        slidesPerView: 1.25,
        centeredSlides: true,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper__button--next",
          prevEl: ".swiper__button--prev",
        },
        thumbs: {
          swiper: REBASE.theme.product_photo_thumbs,
        },
        breakpoints: {
          960: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 0,
          },
        },
      }
    );

    $(document).on("click", ".thumbs .thumbs__item", function () {
      REBASE.theme.product_photo_gallery.slideToLoop($(this).data("index"));
    });

    product = new REBASE.theme.Product({
      $container: $("#add-to-cart-form"),
    });

    // Create an initial interaction to sync up on page load
    if (product.currentVariant) {
      currentSelectedFlavors = product.currentVariant.option1.split("+");

      $(".product-option").removeClass("product-option--selected");

      // initial click to set our current bundle
      $(
        '.product-option--bundle input[value="' +
          product.currentVariant.option3 +
          '"]'
      ).click();

      // series of clicks to set our current flavors
      currentSelectedFlavors.forEach(function (flavor) {
        $(
          '.product-option--flavor input[value="' + flavor.trim() + '"]'
        ).click();
      });
    } else {
      // defaultFlavors = product.variantDefaults[defaultBundleInput.val()].split('|');

      defaultBundleInput.click();
      // defaultFlavors.forEach(function(df) {
      //   $('.product-option--flavor input[value="'+ df +'"]').click()
      // });
    }

    if ($(".sold-in-number") && $("#add-to-cart-form")) {
      var productId = $("#add-to-cart-form").data("productid");
      var soldInNum = localStorage.getItem(productId + "SoldIn");
      if (!soldInNum) {
        soldInNum = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
        localStorage.setItem(productId + "SoldIn", soldInNum);
      }
      $(".sold-in-number").html(soldInNum);
    }

    if ($(".homepage-slider .sold-in-number")) {
      var productId = $(".homepage-slider").data("product-id");
      var soldInNum = localStorage.getItem(productId + "SoldIn");
      if (!soldInNum) {
        soldInNum = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
        localStorage.setItem(productId + "SoldIn", soldInNum);
      }
      $(".homepage-slider .sold-in-number").html(soldInNum);
    }

    showOrderWithinMessage();
  }

  document.addEventListener("DOMContentLoaded", onDOMLoaded);
})();

/* ----------------------------------------------------------------
-------------------------------------------------------------------
Product class
-------------------------------------------------------------------
-----------------------------------------------------------------*/

REBASE.theme.Product = (function () {
  function Product(options) {
    this.variants = null;
    this.$container = options.$container;
    this.data = JSON.parse(document.getElementById("product__json").innerHTML);
    this.currentVariant = JSON.parse(
      document.getElementById("current_variant__json").innerHTML
    );
    this.variantDefaults = JSON.parse(
      document.getElementById("variant__defaults").innerHTML
    );
    this.variantPerBagPrices = JSON.parse(
      document.getElementById("variant_per_bag").innerHTML
    );

    this.settings = {
      single_option_selector: ".single-option-select",
      original_select_id: "select#product-select",
    };

    if (this.data) {
      this._initVariants();
    } else {
      if (console) {
        console.log("Missing product json data!");
      }
    }
  }

  Product.prototype = $.extend({}, Product.prototype, {
    _initVariants: function () {
      var options = {
        $container: this.$container,
        enable_history_state: true,
        single_option_selector: this.settings.single_option_selector,
        original_select_id: this.settings.original_select_id,
        product: this.data,
      };

      this.variants = new REBASE.theme.Variants(options);

      this.$container.on("variantChange", this._updateAddToCart.bind(this));
      this.$container.on("variantChange", this._updatePrices.bind(this));
      this.$container.on("optionChange", this._updateSelectedOption.bind(this));
    },

    _setSlashPrice: function (variant) {
      console.log("setSlash");
      console.log(variant);
      var one_time_slash_price = variant.compare_at_price || "",
        subscription_slash_price = variant.compare_at_price || "",
        formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",

          // These options are needed to round to whole numbers if that's what you want.
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      if (variant.price == variant.compare_at_price) {
        one_time_slash_price = "";
      }
      if (0 !== one_time_slash_price.length) {
        one_time_slash_price = formatter.format(one_time_slash_price * 0.01);
      }
      if (0 !== subscription_slash_price.length) {
        subscription_slash_price = formatter.format(
          subscription_slash_price * 0.01
        );
      }
      // console.log(variant);
      // switch(bundle_type) {
      //   case 'bundle':
      //   case 'single':
      //     one_time_slash_price = '$59.98',
      //     subscription_slash_price = '$59.98';
      //     break;
      //   case 'variety':
      //     one_time_slash_price = '$119.99',
      //     subscription_slash_price = '$119.99';
      //     break;
      //   case 'single-sm':
      //     one_time_slash_price = '',
      //     subscription_slash_price = '$29.99';
      //     break;
      // }

      $("#slash_price_one_time").text(one_time_slash_price);
      $("#slash_price_subscription").text(subscription_slash_price);
    },

    _setPerBagPrices: function (id) {
      var prices = this.variantPerBagPrices[id];
      $(".per-bag--once").html(prices.once);
      $(".per-bag--subs").html(prices.subs);
    },

    _getSelectedBundleLimit: function () {
      return $(".product-option--bundle.product-option--selected input").data(
        "flavor-limit"
      );
    },

    _getSelectedFlavorCount: function () {
      return $(".product-option--flavor.product-option--selected").length;
    },

    _setFlavorsForBundle: function (type) {
      $(".product-option--flavor").removeClass("product-option--selected");
      defaultFlavors = this.variantDefaults[type].split("|");
      defaultFlavors.forEach(function (df) {
        $('.product-option--flavor input[value="' + df + '"]').click();
      });
    },

    _getDisabledButtonLabel: function (count) {
      switch (count) {
        case 1:
          return "Select 2nd Flavor";
        case 2:
          return "Select 3rd Flavor";
        case 3:
          return "Select 4th Flavor";
      }
    },

    _updateBundleOption: function (value) {
      $(".product-option--bundle").removeClass("product-option--selected");
      $(".product-option--bundle" + ' input[value="' + value + '"]')
        .parents(".product-option")
        .addClass("product-option--selected");
    },

    _updateFlavorOption: function (value) {
      var limit = this._getSelectedBundleLimit(),
        count = this._getSelectedFlavorCount();

      if (count < limit) {
        $('.product-option--flavor input[value="' + value + '"]')
          .parents(".product-option")
          .addClass("product-option--selected");
      }

      if (count >= limit) {
        $(".product-option--flavor").removeClass("product-option--selected");
        $('.product-option--flavor input[value="' + value + '"]')
          .parents(".product-option")
          .addClass("product-option--selected");
      }
    },

    _updateSelectedOption: function (e) {
      var type = e.target.dataset.type,
        value = e.target.value;

      if (type == "bundle") {
        this._updateBundleOption(value);
        this._setFlavorsForBundle(value);
      } else if (type == "flavor") {
        this._updateFlavorOption(value);
      }
    },

    _updatePrices: function (e) {
      if (!e.variant) {
        return;
      }
      console.log("update price");
      this._setSlashPrice(e.variant);
      this._setPerBagPrices(e.variant.id);
    },

    _updateAddToCart: function (e) {
      console.log("Bundle js update");
      console.log(e);
      var btn = $("#add-to-cart"),
        btnText = $("#add-to-cart-text"),
        limit = this._getSelectedBundleLimit(),
        selectedCount = this._getSelectedFlavorCount(),
        buttonLabel = btnText.data("add-to-cart-text");

      // if( isAbtesting && limit <= selectedCount ) {
      //   btn.removeClass('disabled');
      //   btnText.text(buttonLabel);
      //   return;
      // }

      if (!e.variant || limit > selectedCount) {
        //buttonLabel = this._getDisabledButtonLabel(selectedCount);
        //btn.addClass('disabled');

        btn.removeClass("disabled");

        if ($(".product-option--flavor.product-option--selected").length <= 0) {
          buttonLabel = "Sold Out";
        }
      } else {
        btn.removeClass("disabled");
      }

      btnText.text(buttonLabel);
    },
  });

  return Product;
})();

/* ----------------------------------------------------------------
-------------------------------------------------------------------
Product Variants class - based on Shopify debut
-------------------------------------------------------------------
-----------------------------------------------------------------*/

REBASE.theme.Variants = (function () {
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.single_option_selector = options.single_option_selector;
    this.original_select_id = options.original_select_id;
    this.enable_history_state = options.enable_history_state;
    this.variantFlavorLimits = JSON.parse(
      document.getElementById("variant__flavor_limits").innerHTML
    );
    this.current_variant = {};

    $(this.single_option_selector, this.$container).on(
      "click",
      this._onOptionChange.bind(this)
    );
  }

  Variants.prototype = $.extend({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form.
     *
     * @return {object} options - key/value pair of name and value
     */
    _getCurrentSelections: function () {
      var options = [];

      options = $.map(
        $(this.single_option_selector, this.$container),
        function (el) {
          var $el = $(el),
            current_option = {};

          console.log($el);
          if ($el.parents(".product-option--selected").length) {
            current_option.value = el.value;
            current_option.type = el.dataset.type;
            return current_option;
          } else {
            return false;
          }
        }
      );

      return options.filter(Boolean);
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selected_values - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function () {
      var selected_values = this._getCurrentOptions(),
        variants = this.product.variants,
        found;

      found = $.grep(variants, function (variant) {
        return selected_values.every(function (values) {
          return variant[values.index] === values.value;
        });
      });

      if (found.length) {
        found = found[0];
      } else {
        found = undefined;
      }

      return {
        variant_match: found,
      };
    },

    _getSelectedBundle: function () {
      return $('input[name="single-option-select-bundle"]:checked').val();
    },

    _getFlavorLimit: function (value) {
      return this.variantFlavorLimits[value];
    },

    _getSelectedVariant: function () {
      var currentSelections = this._getCurrentSelections(),
        variants = [],
        variant = null,
        validSelection = false,
        bundleOption = currentSelections.filter(function (cs) {
          return cs.type === "bundle";
        })[0],
        flavorOptions = currentSelections.filter(function (cs) {
          return cs.type === "flavor";
        });

      // if we don't have enough flavors selected, flag so we can bail early
      console.log("bundle value = " + bundleOption.value);
      validSelection = true;
      switch (bundleOption.value) {
        case "variety":
          // Handle the case where there are less than 4 flavors
          var varietyOptionsLength = Math.min(
            $(".product-options--flavors .product-option").length,
            this._getFlavorLimit(bundleOption.value)
          );
          validSelection = flavorOptions.length === varietyOptionsLength;
          break;
        case "bundle":
        case "single":
        case "single-sm":
          validSelection =
            flavorOptions.length === this._getFlavorLimit(bundleOption.value);
          break;
      }

      isAbtesting = true;

      if (validSelection) {
        // filter by bundle
        console.log(this.product);
        variants = this.product.variants.filter(function (variant) {
          console.log(variant);
          console.log(bundleOption.value);
          return variant.option3 === bundleOption.value;
        });

        console.log("----------1--------------");
        console.log(variants);

        // filter by flavors
        variants = variants.filter(function (variant) {
          var valid = true;

          flavorOptions.forEach(function (flavorOption) {
            if (!variant.option1.includes(flavorOption.value)) {
              valid = false;
            }
          });

          return valid;
        });

        console.log("----------2-------------");
        console.log(variants);

        if (variants.length > 0) {
          variant = variants[0];
        }
      }
      console.log("variant : " + variant);
      return variant;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onOptionChange: function (e) {
      var variant = null,
        selected_bundle = this._getSelectedBundle();

      this.$container.trigger({
        type: "optionChange",
        target: e.target,
        selected_bundle: selected_bundle,
      });

      variant = this._getSelectedVariant();

      this._variantChange(variant);

      if (!variant) {
        this.current_variant = {};
        return;
      }

      this._updateMasterSelect(variant);
      this._updatePrice(variant);
      this.current_variant = variant;

      if (this.enable_history_state) {
        this._updateHistoryState(variant);
      }
    },

    _variantChange: function (variant) {
      this.$container.trigger({
        type: "variantChange",
        variant: variant,
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function (variant) {
      if (
        variant.price === this.current_variant.price &&
        variant.compare_at_price === this.current_variant.compare_at_price
      ) {
        return;
      }

      this.$container.trigger({
        type: "variantPriceChange",
        variant: variant,
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function (variant) {
      if (!history.replaceState || !variant) {
        return;
      }
      var urlParams = new URLSearchParams(window.location.search);
      console.log("urlParams.set -> " + variant.id);
      urlParams.set("variant", variant.id);
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        urlParams.toString();
      window.history.replaceState({ path: newurl }, "", newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function (variant) {
      $(this.original_select_id, this.$container).val(variant.id);
    },
  });

  return Variants;
})();
