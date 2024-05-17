
const Chambre=require('../Models/Chambre')
const Hotel=require('../Models/Hotel')


exports.addHotel = async (req, res) => {
    const { nom,adresse, nb_chambre, email } = req.body;
  
    try {
      const hotel = new Hotel({
        nom,
        adresse,
        nb_chambre,
        email
      });
  
      await hotel.save();
  
      res.json(`Le Hotel a été ajouté avec succès : `);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  exports.getAllHotel = async (req, res) => {
    try {
      const hotels = await Hotel.find();
      res.json(hotels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.getHotelById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const hotel = await Hotel.findById(id);
      console.log(hotel)
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      res.json(hotel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  
  exports.deleteHotel = async (req, res) => {
    const { id } = req.params;
  
    try {
      const hotel = await Hotel.findByIdAndDelete(id);
    
      res.json("hotel deleted succefelly");
    } catch (err) {
      res.status(500).json({ error: err.message });
    
    }
  };



  exports.AddChambreHotel = async (req, res) => {
    const { numero, hotel, reservee,nom_client } = req.body;
    const { id } = req.params;


    try {

      const hotel = await Hotel.findById(id);
      const chambre = new Chambre({
        numero,
        hotel:hotel._id,
        reservee:false,
        nom_client:"",
      });
  
      await chambre.save();
        hotel.nb_chambre+=1;
        await hotel.save();
  
      res.json(`Le Chambre a été ajouté avec succès : `);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.Reserver = async (req, res) => {
    const { id, nom_client } = req.params;

    try {
      const chambre = await Chambre.findByIdAndUpdate(id, { reservee: true, nom_client }, { new: true });

      if (!chambre) {
        return res.status(404).json({ error: "Chambre not found" });
      }

      res.json(chambre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



exports.displayChambres = (socket, data) => {
    console.log("DisplayChambres event received");
    Chambre.find({hotel_id: data.hotel_id, reservee: "false"})
        .then(chambres => {
            socket.emit('displayChambres', chambres);
            console.log(chambres); 
        })
        .catch(err => {
            console.error(err);
        });
};