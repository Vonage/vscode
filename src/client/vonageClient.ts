import { ApplicationAPI, NumbersAPI } from "./api"

export abstract class VonageClient {

  public static application: ApplicationAPI = new ApplicationAPI();
  public static numbers: NumbersAPI = new NumbersAPI();

}