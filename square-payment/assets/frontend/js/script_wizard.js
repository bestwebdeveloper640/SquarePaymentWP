jQuery( document ).ready(
	function () {
		// click on next button
		jQuery( '.form-wizard-next-btn' ).click(
			function () {

				var form_id           = jQuery( this ).parents( 'form' ).data( 'id' );
				var parentFieldset    = jQuery( this ).parents( '.wizard-fieldset' );
				var currentActiveStep = jQuery( this ).parents( '.form-wizard' ).find( '.form-wizard-steps .active' );
				var next              = jQuery( this );
				var nextWizardStep    = true;
				parentFieldset.find( '.wizard-required' ).each(
					function () {
						var thisValue = jQuery( this ).val();

						if (thisValue == "") {
							jQuery( this ).siblings( ".wizard-form-error" ).slideDown();
							nextWizardStep = false;
						} else {
							jQuery( this ).siblings( ".wizard-form-error" ).slideUp();
						}
					}
				);

				/*var result1 = jQuery( "#theForm-" + form_id + " .wizard-fieldset.show .fieldMainWrapper div.wpep-required input" ).filter(
					function () {
						return jQuery.trim( jQuery( this ).val() ).length == 0
					}
				).length == 0;*/

				// console.log('result 1 is '+ result1);

				// client side validation
				var result2    = false;
				var emailCheck = false;
				var wpepError  = '';

				jQuery( "#theForm-" + form_id + " .wizard-fieldset.show .fieldMainWrapper div.wpep-required" ).each(
					function(){
						// console.log('test');
						var current = jQuery( this );

						wpepError = jQuery( '<span />' ).attr( 'class', 'wpepError' ).html( 'Required Field' );

						if (current.find( 'input[type="text"]' ).length > 0) {

							if (current.find( 'input[type="text"]' ).val() == '' || current.find( 'input[type="text"]' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'input[type="text"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="text"]' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
								// console.log('input value: '+ current.find('input').not(':input[type="email"]').val());
							}
						}

						if (current.find( 'select' ).length > 0) {
							if (current.find( 'select' ).val() == '' || current.find( 'select' ).val() == undefined) {
								if (current.find( 'select ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'select' ) );
								}
								result2 = false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
							}
						}

						if (current.find( 'input[type="tel"]' ).length > 0) {

							if (current.find( 'input[type="tel"]' ).val() == '' || current.find( 'input[type="tel"]' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'input[type="tel"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="tel"]' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
								// console.log('input value: '+ current.find('input').not(':input[type="email"]').val());
							}
						}

						if (current.find( 'input[type="password"]' ).length > 0) {

							if (current.find( 'input[type="password"]' ).val() == '' || current.find( 'input[type="password"]' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'input[type="password"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="password"]' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
							}
						}

						if (current.find( 'input[type="color"]' ).length > 0) {

							if (current.find( 'input[type="color"]' ).val() == '' || current.find( 'input[type="color"]' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'input[type="color"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="color"]' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
							}
						}

						if (current.find( 'select' ).length > 0) {

							if (current.find( 'select' ).val() == '' || current.find( 'select' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'select ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'select' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
								// console.log('input value: '+ current.find('input').not(':input[type="email"]').val());
							}
						}

						if (jQuery( '#theForm-' + form_id ).find( 'input[type="checkbox"]' ).length > 0) {

							// for checkbox input we need name because we can select atleast one at a time in group checkbox.
							var checkboxName = current.find( 'input[type="checkbox"]' ).attr( 'name' );

							if (checkboxName != undefined) {
								if ( ! (jQuery( '#theForm-' + form_id ).find( 'input[name="' + checkboxName + '"]' ).is( ':checked' )) ) {
									if (jQuery( '#theForm-' + form_id ).find( 'input[name="' + checkboxName + '"] ~ .wpepError' ).length == 0) {
										jQuery( wpepError ).insertAfter( current.find( 'input[name="' + checkboxName + '"]' ) );
									}
									result2 = false;
									// return false;
								} else {
									wpepError = '';
									jQuery( '#theForm-' + form_id ).find( 'input[name="' + checkboxName + '"] ~ .wpepError' ).remove();
									result2 = true;
								}
							}
						}

						if (jQuery( '#theForm-' + form_id ).find( 'input[type="radio"]' ).length > 0) {

							// for radio input we need name because we can select only one at a time.
							var radioName = current.find( 'input[type="radio"]' ).attr( 'name' );

							if (radioName != undefined) {
								if ( ! (jQuery( '#theForm-' + form_id ).find( 'input[name="' + radioName + '"]' ).is( ':checked' )) ) {
									if (jQuery( '#theForm-' + form_id ).find( 'input[name="' + radioName + '"] ~ .wpepError' ).length == 0) {
										jQuery( wpepError ).insertAfter( current.find( 'input[name="' + radioName + '"]' ) );
									}
									result2 = false;
									// return false;
								} else {
									wpepError = '';
									jQuery( '#theForm-' + form_id ).find( 'input[name="' + radioName + '"] ~ .wpepError' ).remove();
									result2 = true;
								}
							}
						}

						if (current.find( 'input[type="email"]' ).length > 0) {

							if (current.find( 'input[type="email"]' ).val() == '' || current.find( 'input[type="email"]' ).val() == undefined || validateEmail( current.find( 'input[type="email"]' ).val() ) == false ) {
								if (current.find( 'input[type="email"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="email"]' ) );
								}
								emailCheck = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								emailCheck = true;
								// console.log('input value: '+ current.find('input[type="email"]').val());
							}
						}

						if (current.find( 'input[type="date"]' ).length > 0) {

							if (current.find( 'input[type="date"]' ).val() == '' || current.find( 'input[type="date"]' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'input[type="date"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="date"]' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
								// console.log('input value: '+ current.find('input').not(':input[type="email"]').val());
							}
						}

						if (current.find( 'input[type="url"]' ).length > 0) {

							if (current.find( 'input[type="url"]' ).val() == '' || current.find( 'input[type="url"]' ).val() == undefined) {
								// console.log('input is empty ');
								if (current.find( 'input[type="url"] ~ .wpepError' ).length == 0) {
									jQuery( wpepError ).insertAfter( current.find( 'input[type="url"]' ) );
								}
								result2 = false;
								// return false;
							} else {
								wpepError = '';
								current.find( '.wpepError' ).remove();
								result2 = true;
								// console.log('input value: '+ current.find('input').not(':input[type="email"]').val());
							}
						}

					}
				);

				// console.log('result 2 is '+ result2);

				var finalCheck = jQuery( "#theForm-" + form_id + " .wizard-fieldset.show .fieldMainWrapper div.wpep-required" ).find( "span.wpepError" ).length;

				if ( /*result1 &&*/ result2 && wpepError == '' && finalCheck == 0 && emailCheck == true) {
					if (nextWizardStep) {
						next.parents( '.wizard-fieldset' ).removeClass( "show", "400" );
						currentActiveStep.removeClass( 'active' ).addClass( 'activated' ).next().addClass( 'active', "400" );
						next.parents( '.wizard-fieldset' ).next( '.wizard-fieldset' ).addClass( "show", "400" );
						jQuery( document ).find( '.wizard-fieldset' ).each(
							function () {
								if (jQuery( this ).hasClass( 'show' )) {
									var formAtrr = jQuery( this ).attr( 'data-tab-content' );
									jQuery( document ).find( '.form-wizard-steps .form-wizard-step-item' ).each(
										function () {
											if (jQuery( this ).attr( 'data-attr' ) == formAtrr) {
												jQuery( this ).addClass( 'active' );
												var innerWidth = jQuery( this ).innerWidth();
												var position   = jQuery( this ).position();
												jQuery( document ).find( '.form-wizard-step-move' ).css( { "left": position.left, "width": innerWidth } );
											} else {
												jQuery( this ).removeClass( 'active' );
											}
										}
									);
								}
							}
						);
					}
				}
			}
		);
		// click on previous button
		jQuery( '.form-wizard-previous-btn' ).click(
			function () {
				var counter = parseInt( jQuery( ".wizard-counter" ).text() );;
				var prev              = jQuery( this );
				var currentActiveStep = jQuery( this ).parents( '.form-wizard' ).find( '.form-wizard-steps .active' );
				prev.parents( '.wizard-fieldset' ).removeClass( "show", "400" );
				prev.parents( '.wizard-fieldset' ).prev( '.wizard-fieldset' ).addClass( "show", "400" );
				currentActiveStep.removeClass( 'active' ).prev().removeClass( 'activated' ).addClass( 'active', "400" );
				jQuery( document ).find( '.wizard-fieldset' ).each(
					function () {
						if (jQuery( this ).hasClass( 'show' )) {
							var formAtrr = jQuery( this ).attr( 'data-tab-content' );
							jQuery( document ).find( '.form-wizard-steps .form-wizard-step-item' ).each(
								function () {
									if (jQuery( this ).attr( 'data-attr' ) == formAtrr) {
										jQuery( this ).addClass( 'active' );
										var innerWidth = jQuery( this ).innerWidth();
										var position   = jQuery( this ).position();
										jQuery( document ).find( '.form-wizard-step-move' ).css( { "left": position.left, "width": innerWidth } );
									} else {
										jQuery( this ).removeClass( 'active' );
									}
								}
							);
						}
					}
				);
			}
		);

	}
);

/*email filter function*/
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test( String( email ).toLowerCase() );
}


jQuery( ".form-control" ).on(
	'focus',
	function () {
		var tmpThis = jQuery( this ).val();
		if (tmpThis == '') {
			jQuery( this ).parent().addClass( "focus-input" );
		} else if (tmpThis != '') {
			jQuery( this ).parent().addClass( "focus-input" );
		}
	}
).on(
	'blur',
	function () {
		var tmpThis = jQuery( this ).val();
		if (tmpThis == '') {
			jQuery( this ).parent().removeClass( "focus-input" );
			jQuery( this ).siblings( '.wizard-form-error' ).slideDown( "3000" );
		} else if (tmpThis != '') {
			jQuery( this ).parent().addClass( "focus-input" );
			jQuery( this ).siblings( '.wizard-form-error' ).slideUp( "3000" );
		}
	}
);

jQuery( 'ul.wpep_tabs li' ).click(
	function () {
		var tab_id = jQuery( this ).attr( 'data-tab' );

		if ('cashapp' === tab_id){
			jQuery('.wpep-single-form-submit-btn').attr('disabled', 'disabled');
			jQuery('.wpep-wizard-form-submit-btn').attr('disabled', 'disabled');
			
			// jQuery('.wpep-single-form-submit-btn').css('visibility', 'hidden');
		} else if( 'achdebit' === tab_id ) {
			jQuery('.wpep-single-form-submit-btn').attr('disabled', 'disabled');
		} else {
			jQuery('.wpep-single-form-submit-btn').removeAttr('disabled');
			// jQuery('.wpep-single-form-submit-btn').css('visibility', 'visible');
		}
		
		jQuery( 'ul.wpep_tabs li' ).removeClass( 'current' );
		jQuery( '.tab-content' ).removeClass( 'current' );

		jQuery( this ).addClass( 'current' );
		jQuery( "#" + tab_id ).addClass( 'current' );
	}
);