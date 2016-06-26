<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Facades\Image ;
class Album extends Model
{
    protected $fillable = ['filename', 'address'];

    /**
     * @param $urls
     * @return array
     */
    public static function createAlbum($urls){
        $respondArray = [];
        foreach ($urls as $url){
            $extension = pathinfo($url, PATHINFO_EXTENSION);
            $allowedType = array("image/jpeg", "image/gif", "image/png");
            if( !empty($extension) && !in_array($extension, $allowedType)) {
                $filename = str_random(4) . '.' . $extension;
                $data = file_get_contents($url);
                $image = \Image::make($data);
                $destinationPath = public_path('albums/')  ;
                $image->encode($extension)->resize(300,300);
                $image->save($destinationPath . $filename);
                $respondArray[] = [ 'name' => $filename ];
            }
        }
        return $respondArray;
    }
}