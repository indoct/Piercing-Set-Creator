export interface ContextValues {
  type: string | null;
  location: string | null;
  mods: string[];
  // currentPage: number;
  piercings: Array<Piercing>;
  sessionOver: boolean;
  setMods: React.Dispatch<React.SetStateAction<string[]>>;
  handleFilterChange: (key: string, value: string | null) => void;
  confirmDelete: () => void;
  toggleSessionOver: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleModsChange: (modname: string) => void;
  handleBtns: (nodeId: string, nodeLoca: string) => void;
}

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
  selected: boolean;
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
  piercings: Array<Piercing>;
  generateNodes: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sessionOver: boolean;
  togglePlay: () => void;
}

export interface UsePaginateProps {
  totalCount: number;
  itemsPerPage: number;
  siblingCount?: number;
  currentPage: number;
}

export interface PaginateProps extends UsePaginateProps {
  onPageChange: (page: number) => void;
  className?: string;
}

export const ModList: string[] = [
  "isp_silver",
  "isp_gold",
  "p4_blooming",
  "ghouls_customs",
  "LV_E_V1",
];
