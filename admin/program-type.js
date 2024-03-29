(function ($) {
  // Set all variables to be used in scope
  let frame;
  const $addImgButton = $('.upload-custom-img'),
    $delImgButton = $('.delete-custom-img'),
    $imgContainer = $('.custom-img-container'),
    $imgIdInput = $('.custom-img-id');

  // ADD IMAGE LINK
  $addImgButton.on('click', function (event) {
    event.preventDefault();

    // If the media frame already exists, reopen it.
    if (frame) {
      frame.open();
      return;
    }

    // Create a new media frame
    frame = wp.media({
      title: 'Select or Upload Media Of Your Chosen Persuasion',
      button: {
        text: 'Use this media'
      },
      multiple: false // Set to true to allow multiple files to be selected
    });

    // When an image is selected in the media frame...
    frame.on('select', function () {
      // Get media attachment details from the frame state
      var attachment = frame.state().get('selection').first().toJSON();

      // Send the attachment URL to our custom image input field.
      $imgContainer.append(
        '<img src="' + attachment.url + '" alt="" style="max-width:100%;"/>'
      );

      // Send the attachment id to our hidden input
      $imgIdInput.val(attachment.url);

      // Hide the add image link
      $addImgButton.addClass('hidden');

      // Unhide the remove image link
      $delImgButton.removeClass('hidden');
    });

    // Finally, open the modal on click
    frame.open();
  });

  // DELETE IMAGE LINK
  $delImgButton.on('click', function (event) {
    event.preventDefault();

    // Clear out the preview image
    $imgContainer.html('');

    // Un-hide the add image link
    $addImgButton.removeClass('hidden');

    // Hide the delete image link
    $delImgButton.addClass('hidden');

    // Delete the image id from the hidden input
    $imgIdInput.val('');
  });
})(jQuery);
