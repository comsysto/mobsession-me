import { createContext } from "react";
import { Config } from "../config/Config";
import { TimerService } from "./TimerService";
import { SessionService } from "./SessionService";
import { GraphQlClient } from "./GraphQlClient";
import { SessionRepository } from "./SessionRepository";
import { SoundService } from "./SoundService";
import { CopyService } from "./CopyService";
import { StorageService } from "./StorageService";
import { FullscreenService } from "./FullscreenService";

export class Services {
  private readonly timeUpAudio = new Audio(
    "https://smartcloudincubator.de/assets/magic.mp3"
  );

  readonly graphQlClient = new GraphQlClient();
  readonly storageService = new StorageService();
  readonly config = new Config();
  readonly sessionRepository = new SessionRepository(this.graphQlClient, this.config);
  readonly mobSessionService = new SessionService(this.sessionRepository, this.storageService);
  readonly timerService = new TimerService(this.sessionRepository);
  readonly speechService = new SoundService(this.timerService, this.timeUpAudio);
  readonly copyService = new CopyService(window.navigator?.clipboard);
  readonly fullscreenService = new FullscreenService();

  close() {
    this.timerService.close();
    this.sessionRepository.close();
    this.speechService.close();
    this.storageService.close();
  }
}

export const ServicesContext = createContext<Services>({} as Services);
