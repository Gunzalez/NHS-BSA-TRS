/* global $ */
/* global GOVUK */

// Warn about using the kit in production
// if (
//   window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
//   window.console && window.console.info
// ) {
//   window.console.info('GOV.UK Prototype Kit - do not use for production');
//   window.sessionStorage.setItem('prototypeWarning', true)
// }

$(document).ready(function () {

    // Use GOV.UK selection-buttons.js to set selected
    // and focused states for block labels
    var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
    new GOVUK.SelectionButtons($blockLabels); // eslint-disable-line

    // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
    // with role="button" when the space key is pressed.
    GOVUK.shimLinksWithButtonRole.init();

    // Show and hide toggled content
    // Where .block-label uses the data-target attribute
    // to toggle hidden content
    var showHideContent = new GOVUK.ShowHideContent();
    showHideContent.init();

    // nhs bsa specific

    var reportError = function ($obj) {
        var $errorLayer = $obj.parents('.error-layer');
        $errorLayer.addClass('error');
    };

    var hasErrorsInField = function ($field) {
        if($.trim($field.val()) == ""){
            reportError($field);
            return true;
        } else  {
            return false
        }
    };

    var clearErrors = function () {
        $('.error').removeClass('error');
        $('.error-summary').removeClass('error');
    };

    var $formsToValidate = $('.form.validate');
    $formsToValidate.each(function (i, obj) {
        var $form = $(obj);

        $form.on('submit', function (evt) {
            evt.preventDefault();
            clearErrors();
            $form.data('errors', false);

            if($form.attr("id") == "sign-in-form"){
                var $userId = $('#userID', $form);
                if(hasErrorsInField($userId)){
                    $form.data('errors', true);
                }

                var $password = $('#password', $form);
                if(hasErrorsInField($password)){
                    $form.data('errors', true);
                }
            }

            if($form.data('errors')){
                $('.error-summary').addClass('error');
            } else {
                location.assign($form.attr('action'));
            }
        })
    })


});
