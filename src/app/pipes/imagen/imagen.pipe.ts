import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  

  /*transform(img: string,size:string='w500'): string {
    if(!img){
      return './assets/no-image.jpg';
    }
    return environment.imgPath+"/"+size+"/"+img;
  }*/
  transform(img: string): string {
    if(!img){
      return '../assets/no-image.jpg';
    }
    return "../../assets/imgs/"+img;
  }
}
