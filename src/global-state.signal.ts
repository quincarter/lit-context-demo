import { Signal, signal } from "@lit-labs/preact-signals";
import { DataObjectInterface } from "./my.interfaces";

export const  myDataObject: Signal<DataObjectInterface> = signal({
  name: signal(''),
  title: '',
  description: '',
  metadata: {
    date: '',
    time: '',
    status: 'REJECTED',
  },
  tags: [],
});