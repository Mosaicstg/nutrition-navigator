(function ($) {
  // Set all variables to be used in scope
  let frame;

  const $addFile = $('.upload-program-file'),
    $deleteFile = $('.delete-program-file'),
    $fileNameContainer = $('.file-name-container'),
    $fileURLHiddenInput = $('.file-attachment-id');

  $addFile.on('click', (event) => {
    event.preventDefault();

    // If the media frame already exists, reopen it.
    if (frame) {
      frame.open();
      return;
    }

    // Create a new media frame
    frame = wp.media({
      title: 'Select or Upload File',
      button: {
        text: 'Use this file'
      },
      multiple: false // Set to true to allow multiple files to be selected
    });

    // When a file is selected in the media frame...
    frame.on('select', () => {
      // Get media attachment details from the frame state
      var attachment = frame.state().get('selection').first().toJSON();

      console.log(attachment);

      // Send the attachment id to our hidden input
      $fileURLHiddenInput.val(attachment.id);

      // Send attachment name
      $fileNameContainer.html(attachment.filename);
      $fileNameContainer.removeClass('hidden');

      // Hide the add image link
      $addFile.addClass('hidden');

      // Un-hide the remove image link
      $deleteFile.removeClass('hidden');
    });

    // Finally, open the modal on click
    frame.open();
  });

  $deleteFile.on('click', (event) => {
    event.preventDefault();

    // Clear out file name
    $fileNameContainer.html('');
    $fileNameContainer.addClass('hidden');

    // Un-hide the add image link
    $addFile.removeClass('hidden');

    // Hide the delete image link
    $deleteFile.addClass('hidden');

    // Delete the image id from the hidden input
    $fileURLHiddenInput.val('');
  });
})(jQuery);
