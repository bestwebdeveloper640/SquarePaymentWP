jQuery( document ).ready(
	function () {

		jQuery( ".selectedPlan input[type='radio']" ).change(
			function () {

				var radioValue = jQuery( this ).val();
				if (radioValue) {
					var form_id = jQuery( this ).parents( 'form' ).data( 'id' );
					
					if ( jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).length > 0 ) { 
						jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).remove();
					}
				
					if ( jQuery(`#theForm-${form_id} .wpep-alert-coupon`).length > 0 ) {
						jQuery(`#theForm-${form_id} .wpep-alert-coupon`).remove();
					}

					jQuery( 'form[data-id="' + form_id + '"] .display' ).text( radioValue );
					jQuery( 'form[data-id="' + form_id + '"] .display' ).next().next( 'input[name="one_unit_cost"]' ).val( radioValue ).trigger('change');
					jQuery( 'form[data-id="' + form_id + '"] .display' ).next( 'input[name="wpep-selected-amount"]' ).val( radioValue ).trigger('change');
					//jQuery( '#one_unit_cost' ).val( radioValue.trim() );
					jQuery( '#wpep_quantity_' + form_id ).val( 1 );
					jQuery( 'form[data-id="' + form_id + '"] .wpep-single-form-submit-btn' ).removeClass( 'wpep-disabled' );
					jQuery( 'form[data-id="' + form_id + '"] .wpep-wizard-form-submit-btn' ).removeClass( 'wpep-disabled' );
				}
			}
		);

		function prepare_display_amount(currencyType, currency, val) {

			if (currencyType == 'symbol') {

				if (currency == 'USD') {
					currency = '$' + val;
				}

				if (currency == 'CAD') {
					currency = 'C$' + val;
				}

				if (currency == 'AUD') {
					currency = 'A$' + val;
				}

				if (currency == 'JPY') {
					currency = '¥' + val;
				}

				if (currency == 'GBP') {
					currency = '£' + val;
				}

			} else {

				currency = val + ' ' + currency;

			}

			return currency;

		}

		jQuery( 'body' ).on(
			'DOMSubtreeModified',
			'.paynowDrop',
			function(){

				$selected_value = jQuery( '.selection' ).data( 'value' );
				var form_id     = jQuery( this ).parents( 'form' ).data( 'id' );

				if ( jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).length > 0 ) { 
					jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).remove();
				}
			
				if ( jQuery(`#theForm-${form_id} .wpep-alert-coupon`).length > 0 ) {
					jQuery(`#theForm-${form_id} .wpep-alert-coupon`).remove();
				}
				jQuery( 'form[data-id="' + form_id + '"] .display' ).text( $selected_value );
				jQuery( 'form[data-id="' + form_id + '"] .display' ).next().next( 'input[name="one_unit_cost"]' ).val( $selected_value ).trigger('change');
				jQuery( 'form[data-id="' + form_id + '"] .display' ).next( 'input[name="wpep-selected-amount"]' ).val( $selected_value ).trigger('change');
				jQuery( 'form[data-id="' + form_id + '"] .wpep-single-form-submit-btn' ).removeClass( 'wpep-disabled' );
				jQuery( 'form[data-id="' + form_id + '"] .wpep-wizard-form-submit-btn' ).removeClass( 'wpep-disabled' );

				if (jQuery( '.paynowDrop option:selected' ).text() == "Other") {
					jQuery( 'form[data-id="' + form_id + '"] .showPayment' ).addClass( 'shcusIn' );
					jQuery( 'form[data-id="' + form_id + '"] .showPayment input' ).val( '' );
				} else {
					jQuery( 'form[data-id="' + form_id + '"] .showPayment' ).removeClass( 'shcusIn' );
					jQuery( 'form[data-id="' + form_id + '"] .showPayment input' ).val( '' );
				}

			}
		);	



		jQuery( '.otherPayment' ).on(
			'change',
			function (e) {

				var form_id      = jQuery( this ).parents( 'form' ).data( 'id' );
				var currency     = jQuery( this ).parents( 'form' ).data( 'currency' );
				var currencyType = jQuery( this ).parents( 'form' ).data( 'currency-type' );
				var max          = parseFloat( jQuery( this ).attr( 'max' ) );
				var min          = parseFloat( jQuery( this ).attr( 'min' ) );
				var val          = jQuery( this ).val();
				jQuery( '#one_unit_cost' ).val( val );
				jQuery( '#wpep_quantity_' + form_id ).val( 1 );

				if ( jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).length > 0 ) { 
					jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).remove();
				}
			
				if ( jQuery(`#theForm-${form_id} .wpep-alert-coupon`).length > 0 ) {
					jQuery(`#theForm-${form_id} .wpep-alert-coupon`).remove();
				}

	
				if (val != '' && val >= min && val <= max) {

					currency = prepare_display_amount(currencyType, currency, val);
				
					jQuery( this ).val( val );
					jQuery( 'form[data-id="' + form_id + '"] .display' ).text( currency );
					jQuery( 'form[data-id="' + form_id + '"] .display' ).next( 'input[name="wpep-selected-amount"]' ).val( jQuery( this ).val() ).trigger('change');
					jQuery( 'form[data-id="' + form_id + '"] .wpep-single-form-submit-btn' ).removeClass( 'wpep-disabled' );
					jQuery( 'form[data-id="' + form_id + '"] .wpep-wizard-form-submit-btn' ).removeClass( 'wpep-disabled' );

				} else {

					currency = prepare_display_amount(currencyType, currency);
					
					jQuery( this ).val( '' );
					jQuery( 'form[data-id="' + form_id + '"] .display' ).text( '' );
					jQuery( 'form[data-id="' + form_id + '"] .display' ).next( 'input[name="wpep-selected-amount"]' ).val( '' ).trigger('change');
					jQuery( 'form[data-id="' + form_id + '"] .wpep-single-form-submit-btn' ).addClass( 'wpep-disabled' );
					jQuery( 'form[data-id="' + form_id + '"] .wpep-wizard-form-submit-btn' ).addClass( 'wpep-disabled' );
				}

			}
		);

		jQuery( '.minus-btn' ).on(
			'click',
			function (e) {
				e.preventDefault();
				var $this  = $( this );
				var $input = $this.closest( 'div' ).find( 'input' );
				var value  = parseFloat( $input.val() );

				if (value > 1) {
					value = value - 1;
				} else {
					value = 0;
				}

				$input.val( value );
			}
		);

		jQuery( '.plus-btn' ).on(
			'click',
			function (e) {
				e.preventDefault();
				var $this  = $( this );
				var $input = $this.closest( 'div' ).find( 'input' );
				var value  = parseFloat( $input.val() );

				if (value < 100) {
					value = value + 1;
				} else {
					value = 100;
				}

				$input.val( value );
			}
		);

		jQuery( '.like-btn' ).on(
			'click',
			function () {
				$( this ).toggleClass( 'is-active' );
			}
		);

		jQuery( "#btn-download" ).click(
			function () {
				$( this ).toggleClass( "downloaded" );
			}
		);

		jQuery( 'ul.wpep_tabs li' ).click(
			function () {
				var tab_id = jQuery( this ).attr( 'data-tab' );

				if ('cashapp' === tab_id){
					jQuery('.wpep-single-form-submit-btn').attr('disabled', 'disabled');
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

		function validateEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test( String( email ).toLowerCase() );
		}

		jQuery( ".cardsBlock01 input[name$='savecards']" ).click(
			function () {
				var test = jQuery( this ).val();

				jQuery( "div.desc" ).hide();
				jQuery( "#cardContan" + test ).show();
			}
		);

		jQuery( ".custom-select" ).each(
			function() {

				var classes     = jQuery( this ).attr( "class" ),
				id              = jQuery( this ).attr( "id" ),
				name            = jQuery( this ).attr( "name" );
				var placeholder = 'Please Select';

				if (jQuery( this ).attr( "placeholder" ) !== undefined) {
					placeholder = jQuery( this ).attr( "placeholder" );
				}

				var template = '<div class="' + classes + '">';
				template    +=
				'<span class="custom-select-trigger">' +
				placeholder +
				"</span>";
				template    += '<div class="custom-options">';
				jQuery( this )
				.find( "option" )
				.each(
					function() {
						template +=
						'<span class="custom-option ' +
						jQuery( this ).attr( "class" ) +
						'" data-value="' +
						jQuery( this ).attr( "value" ) +
						'">' +
						jQuery( this ).html() +
						"</span>";
					}
				);
				template += "</div></div>";

				jQuery( this ).wrap( '<div class="custom-select-wrapper"></div>' );
				jQuery( this ).hide();
				jQuery( this ).after( template );

			}
		);

		jQuery( ".custom-option:first-of-type" ).hover(
			function() {
				jQuery( this )
					.parents( ".custom-options" )
					.addClass( "option-hover" );
			},
			function() {
				jQuery( this )
					.parents( ".custom-options" )
					.removeClass( "option-hover" );
			}
		);
		jQuery( ".custom-select-trigger" ).on(
			"click",
			function() {
				jQuery( "html" ).one(
					"click",
					function() {
						jQuery( ".custom-select" ).removeClass( "opened" );
					}
				);
				jQuery( this )
				.parents( ".custom-select" )
				.toggleClass( "opened" );
				event.stopPropagation();
			}
		);
		jQuery( ".custom-option" ).on(
			"click",
			function() {

				jQuery( this )
				.parents( ".custom-select-wrapper" )
				.find( "select" )
				.val( jQuery( this ).data( "value" ) );

				jQuery( this )
				.parents( ".custom-options" )
				.find( ".custom-option" )
				.removeClass( "selection" );

				jQuery( this ).addClass( "selection" );
				jQuery( this )
				.parents( ".custom-select" )
				.removeClass( "opened" );

				jQuery( this )
				.parents( ".custom-select" )
				.find( ".custom-select-trigger" )
				.text( jQuery( this ).text() );
				
			}
		);

		jQuery( ".file-upload-wrapper" ).on(
			"change",
			".file-upload-field",
			function () {
				jQuery( this ).parent( ".file-upload-wrapper" ).attr( "data-text", jQuery( this ).val().replace( /.*(\/|\\)/, '' ) );
			}
		);

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

		jQuery( ".otherpayment" ).click(
			function () {
				var form_id = jQuery( this ).parents( 'form' ).data( 'id' );
				jQuery( 'form[data-id="' + form_id + '"] .showPayment' ).addClass( 'shcusIn' );
				jQuery( 'form[data-id="' + form_id + '"] .display' ).empty();
				jQuery( 'form[data-id="' + form_id + '"] .wpep-single-form-submit-btn' ).addClass( 'wpep-disabled' );
				jQuery( 'form[data-id="' + form_id + '"] .wpep-wizard-form-submit-btn' ).addClass( 'wpep-disabled' );
				jQuery( 'form[data-id="' + form_id + '"] .showPayment input' ).val( '' );
			}
		);


		jQuery( '.paynow' ).click(
			function () {

				var form_id = jQuery( this ).parents( 'form' ).data( 'id' );
				
				if ( jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).length > 0 ) { 
					jQuery(`#theForm-${form_id} input[name="wpep-discount"]`).remove();
				}

				if ( jQuery(`#theForm-${form_id} .wpep-alert-coupon`).length > 0 ) {
					jQuery(`#theForm-${form_id} .wpep-alert-coupon`).remove();
				}

				jQuery( 'form[data-id="' + form_id + '"] .display' ).text( jQuery( this ).text() );
				jQuery( 'form[data-id="' + form_id + '"] .display' ).next().next( 'input[name="one_unit_cost"]' ).val( jQuery( this ).text() ).trigger('change');
				jQuery( 'form[data-id="' + form_id + '"] .display' ).next( 'input[name="wpep-selected-amount"]' ).val( jQuery( this ).text() ).trigger('change');
				//jQuery( '#one_unit_cost' ).val( jQuery( this ).text().trim() );
				jQuery( '#wpep_quantity_' + form_id ).val( 1 );
				jQuery( 'form[data-id="' + form_id + '"] .wpep-single-form-submit-btn' ).removeClass( 'wpep-disabled' );
				jQuery( 'form[data-id="' + form_id + '"] .wpep-wizard-form-submit-btn' ).removeClass( 'wpep-disabled' );

				jQuery( 'form[data-id="' + form_id + '"] .showPayment' ).removeClass( 'shcusIn' );
				jQuery( 'form[data-id="' + form_id + '"] .customPayment' ).text( jQuery( this ).val() );

				// jQuery('#wpep_amount_'+form_id).val(jQuery(this).text().replace('$',''));
			}
		);

	}
);
