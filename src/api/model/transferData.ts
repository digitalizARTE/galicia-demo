/**
 * Banco Galicia - Hackaton 2019
 * Definición de la API para el Hackaton de Banco Galicia
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface TransferData { 
    id?: number;
    type?: string;
    transactionDate?: string;
    status?: string;
    medium?: string;
    playerAccountId?: string;
    payeeAccountId?: string;
    amount?: number;
    description?: string;
}
