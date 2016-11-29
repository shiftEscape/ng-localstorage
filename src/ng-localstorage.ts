import { Injectable } from '@angular/core';

@Injectable()
export class NgLocalStorage {

   private appName = "NG-LOCALSTORAGE";
   private noSupportMessage: string = `[${this.appName}]: HTML5 localStorage not supported in this Browser!`;
   private objectProperties: any = [];
   private hasSublevel: boolean = false;
   private hasStorageSupport: boolean = true;

  /**
   * @constructor
   */
   constructor() {
      if(!this.__supportsLocalStorage()) {
         this.hasStorageSupport = false;
         console.warn(this.noSupportMessage)
      } else {
         console.info(`[${this.appName}]: HTML5 localStorage supported in this Browser! :)`)
      }
   }

  /**
   * localStorage `getItem` method
   * @param {string} props - Dot separated string - dot notation to access property values
   */
   public get (props: string) {
      if(!this.hasStorageSupport) {
         console.warn(this.noSupportMessage);
      }
      
      let objectName = this.__extractObjectName(props);
      let objectValue = localStorage.getItem(objectName);
      
      if(!objectValue) {
         console.warn(`Item "${objectName}" does not exists in localStorage. Please verify item.`);
         return undefined;
      }

      let parsedData = this.__tryParse(objectValue);

      if (parsedData.valid) {
         return this.__getPropertyData(parsedData.value, this.objectProperties.join('.'))
      } else {
         return objectValue;
      }

   }

  /**
   * localStorage `setItem` method
   * @param {string} key - Item / key where the value will be stored
   * @param {any} value - Value to be stored; Whether a String or an Object
   */
   public set (key: string, value: any) {
      if(!this.hasStorageSupport) {
         console.warn(this.noSupportMessage);
      }

      try {
         localStorage.setItem(key, typeof(value) === "object" ? JSON.stringify(value) : value);
      } catch (e) {
         console.warn(`[${this.appName}]: ${e}`);
      }
   }

  /**
   * localStorage `remove` method
   * @param {string} key - Item key to be removed from localStorage
   */
   public remove (key: string) {
      if(!this.hasStorageSupport) {
         console.warn(this.noSupportMessage);
      }

      try {
         localStorage.removeItem(key);
      } catch (e) {
         console.warn(`[${this.appName}]: ${e}`);
      }
   }

  /**
   * localStorage `clear` method
   */
   public clear () {
      if(!this.hasStorageSupport) {
         console.warn(this.noSupportMessage);
      }

      try {
         localStorage.clear();
      } catch (e) {
         console.warn(`[${this.appName}]: ${e}`);
      }
   }

  /**
   * Used to extract Object from giving dot-notation string
   * @param {string} props - Dot separated string - dot notation to access property values
   */
   private __extractObjectName (props: any) {
      let parts = props.split('.');
      this.objectProperties = parts.splice(1);
      this.hasSublevel = this.objectProperties.length == 0 ? false : true;
      return parts[0];
   }

  /**
   * Recursive method to get property value based on dot-notation string input
   * @param {object} obj - Object to be searched
   * @param {string} props - Dot separated string - dot notation to access property values
   */
   private __getPropertyData (obj: any, props: any): any {
      if (!props) return obj;
      let propsArr = props.split('.');
      let prop = propsArr.splice(0, 1);
      return this.__getPropertyData(obj[prop], propsArr.join('.'));
   }

  /**
   * Used to catch possible errors in parsing data
   * @param {any} data - Value retrieved from localStorage data
   */
   private __tryParse (data: any) {
      try {
         return { value: JSON.parse(data), valid: true };
      } catch (e) {
         return { value: data, valid: false };
      }
   }

  /**
   * Used to check localStorage support
   */
   private __supportsLocalStorage() {
      return typeof(Storage) !== 'undefined';
   }

}
