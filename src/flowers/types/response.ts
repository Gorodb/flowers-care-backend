import { Flower } from '../entities/flower.entity';

export interface FlowersResponse {
  success: boolean;
  data?: Flower;
}

export interface AllFlowersResponse {
  success: boolean;
  data?: Flower[];
}

export interface DeleteResponse {
  success: boolean;
}
