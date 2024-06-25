export interface Piercing {
  index: number;
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
  disabled: boolean;
  matcat: string;
  matid: string;
  modurl: string;
}

export interface ModalProps {
  onClose: () => void;
  show: boolean;
}

export interface SetModalProps extends ModalProps {
  generateNodes: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sessionOver: boolean;
  togglePlay: () => void;
}

export interface PaginateProps {
  itemsPerPage: number;
  filteredPiercings: Piercing[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export interface PiercingTileProps {
  prc: Piercing;
}

export const ModList: string[] = ["isp_gold", "isp_silver", "p4_blooming", "ghouls_customs", "LV_E_V1"];
