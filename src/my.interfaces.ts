import { Signal } from "@lit-labs/preact-signals";

export interface DataObjectInterface {
    name: Signal<string>;
    title: string;
    description: string;
    metadata: ObjectMetaData;
    tags: string[];
  }
  
export interface ObjectMetaData {
    date: string;
    time: string;
    status: string;
}