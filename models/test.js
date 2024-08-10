const mongoose = require('mongoose');


const ExpertUserSchema = new mongoose.Schema({
      active: {
        type: Boolean,
        default: false,
      }, /// si le compte est activé ou pas 
      bio: {
        type: String,
        default: '',
        trim: true,
      }, // la biographie
      birthDay: {
        type: String,
        required: true,
        trim: true,
      }, // la date de naissance day
      birthMonth: {
        type: String,
        required: true,
        trim: true,
      }, // la date de naissance month
      birthYear: {
        type: String,
        required: true,
        trim: true,
      },// la date de naissance year
      certification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'certification',
      }, 
      completedProfile: {
        type: Boolean,
        default: false,
        required: true,
      }, 
      dateOfCertification: {
        type: Date,
      }, /// la date quand il a recu son certif
      expertise: {
        type: String,
      },// expertise 
      facebookLink: {
        type: String,
      },
      gameProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gameprogress',
      },
      instagramLink: {
        type: String,
      },
      location: {
        // Always Point type ==> coordinates: [longitude, latitude]
        coordinates: {
          type: [Number],
          required: true,
        },
        address: String,
      },
      playedToday: {
        type: Number,
        default: 0,
      },
      played: {
        type: [{ type: Number }], // keep track of the number(id) of the games played
        default: [],
      },
      ratingAverage: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true,
      },
      ratingCount: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
      },
      reviews: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review',
          },
        ],
        default: [],
        required: true,
      },
      status: {
        type: String,
        default: 'IN_PROGRESS',
        enum: ['IN_PROGRESS', 'FINISHED', 'SUBMITTED', 'ACCEPTED', 'DECLINED'],
      },
      story: {
        type: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'WebInfluncerStory' },
        ],
        default: [],
      },
      tiktokLink: {
        type: String,
      },
    },

)