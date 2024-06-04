// index: 1,
// site_cat: "vanilla-ab",
// type: "vanilla",
// set_name: "Fastened Stars",
// color: "silver",
// name: "Ring with Spikes",
// pt_bone: "Lobe Lower (L)",
// bone: "piercing_lobe_a_l",
// location: "ears",
// nodeid: "840aac96-fc21-4f7a-95e0-bbdd99f2e8fd",
// imgurl: "assets/images/van-ring-spikes.jpg",
// selected: false,
// disabled: false,
// matcat: "set-a",
// matid: "ff3eeaa1-454f-2053-8bbc-be7832c420dd",
// modurl: "",
// export interface Piercing {
//   index: number;
//   site_cat: string;
//   type: string;
//   set_name: string;
// }

type CommonStringProperties = {
  site_cat: string;
  type: string;
  set_name: string;
  color: string;
  name: string;
  pt_bone: string;
  bone: string;
  location: string;
  nodeid: string;
  imgurl: string;
  matcat: string;
  matid: string;
  modurl: string;
};

export interface Piercing extends CommonStringProperties {
  index: number;
  selected: boolean;
  disabled: boolean;
}

export interface SetModalProps {
  show: boolean;
  onClose: () => void;
  piercings: Array<Piercing>;
  generateNodes: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sessionOver: boolean;
  togglePlay: () => void;
}
