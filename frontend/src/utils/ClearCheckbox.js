export default function ClearCheckbox() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Iterate over each checkbox and set its 'checked' property to false
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
