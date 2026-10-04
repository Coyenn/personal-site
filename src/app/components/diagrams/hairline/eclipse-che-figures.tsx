import { HairlineFigure } from "./hairline-figure";

export function SharedIssuerFigure() {
  return (
    <HairlineFigure
      className="mt-12 mb-0"
      explanation="Three plates on one spindle: the Keycloak realm, the K3s API server, and Che. They stack because each uses the same issuer URL, and each carries the same client ID. Keycloak issues tokens, K3s accepts them, and Che signs users in."
      name="spindle"
      rest="realms/che"
      title="ONE ISSUER"
    />
  );
}

export function IngressRoutesFigure() {
  return (
    <HairlineFigure
      explanation="Traefik receives requests and routes them by hostname: keycloak.example.com goes to the keycloak service on port 80, and che.example.com goes to che-gateway on port 8080."
      name="points"
      rest="traefik :443"
      title="INGRESS"
    />
  );
}
