export type ArchitectureComponent = {
  name: string;
  responsibility: string;
  technologies: string[];
};

export type ArchitectureDecision = {
  title: string;
  reason: string;
  tradeoff: string;
};

export type ArchitectureFlow = {
  title: string;
  steps: string[];
};

export type ArchitectureQuality = {
  title: string;
  description: string;
  checks: string[];
};

export type ProjectArchitectureData = {
  summary: string;
  diagramDefinition: string;
  components: ArchitectureComponent[];
  requestFlow: string[];
  dataFlow: ArchitectureFlow[];
  apiFlow: ArchitectureFlow[];
  securityFlow: ArchitectureFlow[];
  scalingStrategy: ArchitectureQuality[];
  deployment: ArchitectureQuality[];
  decisions: ArchitectureDecision[];
  risks: ArchitectureQuality[];
};

export type ProjectArchitecture = {
  title: string;
  slug: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  architecture: ProjectArchitectureData;
};
