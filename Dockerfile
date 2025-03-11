FROM n8nio/n8n:latest

# Switch to root user to install curl
USER root

# Install curl using apk (for Alpine-based images)
RUN apk add --no-cache curl gettext jq util-linux sqlite typescript

# Set working directory
WORKDIR /home/node

# Copy the custom entrypoint script
COPY scripts/entrypoint.sh /home/node/entrypoint.sh

# Give execution permission and set ownership
RUN chmod +x /home/node/entrypoint.sh && chown node:node /home/node/entrypoint.sh

RUN rm -rf ./custom-node/node_modules
#RUN chmod +x -R /home/node/.n8n/custom && chown node:node -R /home/node/.n8n/custom
#RUN #cd /home/node/.n8n/custom && npm init -y

## Switch back to non-root user
#USER node

# Set our custom script as the entrypoint
ENTRYPOINT ["/home/node/entrypoint.sh"]
