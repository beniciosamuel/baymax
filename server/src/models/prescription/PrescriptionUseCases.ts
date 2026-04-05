import type { Context } from "../../services/Context";
import type {
  PrescriptionCreateDTO,
  PrescriptionUpdateContentDTO,
} from "./PrescriptionDTO";
import { PrescriptionEntity } from "./PrescriptionEntity";
import { PrescriptionRepository } from "./PrescriptionRepository";

export class PrescriptionUseCases {
  static async getPrescriptionById(
    id: string,
    context: Context,
  ): Promise<PrescriptionEntity | null> {
    return PrescriptionRepository.fromId(id, context);
  }

  static async createPrescription(
    args: PrescriptionCreateDTO,
    context: Context,
  ): Promise<PrescriptionEntity> {
    /* 
      Valida os dados da requisição aqui
        - Verifica se patientId e doctorId existem e são válidos
        - Verifica se content é uma string ou null
        - Cria registro de prescription
        - Faz requisição ao serviço de interações medicamentosas para validar o conteúdo da prescrição
        - Criar registro de interaction_results para armazenar os resultados da validação de interações 
          medicamentosas com a versão da prescrição 
    */
    return PrescriptionRepository.create(args, context);
  }

  static async updatePrescriptionContent(
    args: PrescriptionUpdateContentDTO,
    context: Context,
  ): Promise<PrescriptionEntity> {
    return PrescriptionRepository.updateContent(args, context);
  }
}
