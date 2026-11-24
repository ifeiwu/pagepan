<?php
echo '<input 
        class="input"
        type="' . $type . '"
        name="' . $name . '"
        value="' . $value . '"
        ' . ($placeholder ?? '' ? 'placeholder="' . $placeholder . '"' : '') . '
        ' . ($min ?? '' ? 'min="' . $min . '"' : '') . '
        ' . ($max ?? '' ? 'max="' . $max . '"' : '') . '
        ' . ($pattern ?? '' ? 'pattern="' . $pattern . '"' : '') . '
        ' . ($disabled ?? '' ? 'disabled' : '') . '
        ' . ($readonly ?? '' ? 'readonly' : '') . '
        ' . ($required ?? '' ? 'required' : '') . '>';