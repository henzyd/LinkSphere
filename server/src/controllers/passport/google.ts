import { Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "../../db";

const googleOauthProvider = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  if (profile) {
    const user = await prisma.user.findUnique({
      where: {
        email: profile.emails?.[0].value || "",
      },
      include: {
        oauthProviders: true,
      },
    });

    if (user) {
      const provider = user.oauthProviders.find(
        (item) => item.provider === "google"
      );

      if (provider) {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: new Date(),
            oauthProviders: {
              update: {
                where: {
                  id: provider?.id,
                },
                data: {
                  lastUsedAt: new Date(),
                },
              },
            },
          },
        });
      } else {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: new Date(),
            oauthProviders: {
              create: {
                provider: "google",
                providerId: profile.id,
                lastUsedAt: new Date(),
              },
            },
          },
        });
      }
    } else {
      const newUser = await prisma.user.create({
        data: {
          username: profile.displayName,
          email: profile.emails?.[0].value || "",
          lastLogin: new Date(),
          profile: {
            create: {
              firstName: profile.name?.givenName || "",
              lastName: profile.name?.familyName || "",
            },
          },
          oauthProviders: {
            create: {
              provider: "google",
              providerId: profile.id,
              lastUsedAt: new Date(),
            },
          },
        },
      });
    }
  }

  return done(null, profile);
};

export default googleOauthProvider;
