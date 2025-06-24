<?php

namespace App\Actions;

use Illuminate\Http\UploadedFile;

class StoreImageAction
{
  public function handle(UploadedFile $image)
  {
    if($image) {
      $image->store('products', 'public');
      return $image->hashName();
    }
  }
}
