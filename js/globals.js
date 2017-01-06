var Globals =
    {
        BaseSize: 1,
        EnemyCycleLength: 180,
        EnemyLaserSpeed: 4,
        EnemySpeed: 0.5,
        LaserColor: 0xFFFF00,
        LaserDelay: 10,
        LaserIntensity: 2,
        PlayerLaserSpeed: 4,
        PlayerSpeed: 4,
        ShipColor: 0x39FF14
    };

var Difficulty =
    {
        Easy: 1, // Enemies move side to side
        Medium: 2, // Enemies move in all 4 directions
        Hard: 3 // Enemies move side to side while approaching player
    }

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}