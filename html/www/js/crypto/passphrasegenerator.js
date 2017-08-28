/******************************************************************************
 * Copyright © 2013-2016 The Nxt Core Developers.                             *
 * Copyright © 2016-2017 Jelurida IP B.V.                                          *
 *                                                                            *
 * See the LICENSE.txt file at the top-level directory of this distribution   *
 * for licensing information.                                                 *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement with Jelurida B.V.,*
 * no part of the Nxt software, including this file, may be copied, modified, *
 * propagated, or distributed except according to the terms contained in the  *
 * LICENSE.txt file.                                                          *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

/**
 * @depends {../3rdparty/jquery-2.1.0.js}
 */

var PassPhraseGenerator = {
    passPhrase: "",

	generatePassPhrase: function(container) {
        var $container = $(container);
		$container.find(".account_phrase_generator_steps").hide();
		$container.find("textarea").val("");

		var crypto = window.crypto || window.msCrypto;
		if (crypto) {
			$container.find(".step_2").show();
			$("#account_phrase_generator_start").show();
			$("#account_phrase_generator_stop").hide();

			var bits = 128;
			var random = new Uint32Array(bits / 32);
			crypto.getRandomValues(random);
			var n = this.words.length;
			var	phraseWords = [];
			var	x, w1, w2, w3;

			for (var i=0; i < random.length; i++) {
				x = random[i];
				w1 = x % n;
				w2 = (((x / n) >> 0) + w1) % n;
				w3 = (((((x / n) >> 0) / n) >> 0) + w2) % n;

				phraseWords.push(this.words[w1]);
				phraseWords.push(this.words[w2]);
				phraseWords.push(this.words[w3]);
			}

			this.passPhrase = phraseWords.join(" ");
			crypto.getRandomValues(random);
			$container.find(".step_2 textarea").val(this.passPhrase).prop("readonly", true);
			setTimeout(function () {
				$("#account_phrase_generator_start").hide();
				$("#account_phrase_generator_stop").fadeIn("slow");
				$("#custom_passphrase_link").show();
			}, 1500);
		} else {
			$container.find(".step_2 textarea").val($.t("unavailable")).prop("readonly", true);
			alert($.t("error_encryption_browser_support"));
		}
	},

	reset: function() {
		this.passPhrase = "";
	},

    //words: ["like", "just", "love", "know", "never", "want", "time", "out", "there", "make", "look", "eye", "down", "only", "think", "heart", "back", "then", "into", "about", "more", "away", "still", "them", "take", "thing", "even", "through", "long", "always", "world", "too", "friend", "tell", "try", "hand", "thought", "over", "here", "other", "need", "smile", "again", "much", "cry", "been", "night", "ever", "little", "said", "end", "some", "those", "around", "mind", "people", "girl", "leave", "dream", "left", "turn", "myself", "give", "nothing", "really", "off", "before", "something", "find", "walk", "wish", "good", "once", "place", "ask", "stop", "keep", "watch", "seem", "everything", "wait", "got", "yet", "made", "remember", "start", "alone", "run", "hope", "maybe", "believe", "body", "hate", "after", "close", "talk", "stand", "own", "each", "hurt", "help", "home", "god", "soul", "new", "many", "two", "inside", "should", "true", "first", "fear", "mean", "better", "play", "another", "gone", "change", "use", "wonder", "someone", "hair", "cold", "open", "best", "any", "behind", "happen", "water", "dark", "laugh", "stay", "forever", "name", "work", "show", "sky", "break", "came", "deep", "door", "put", "black", "together", "upon", "happy", "such", "great", "white", "matter", "fill", "past", "please", "burn", "cause", "enough", "touch", "moment", "soon", "voice", "scream", "anything", "stare", "sound", "red", "everyone", "hide", "kiss", "truth", "death", "beautiful", "mine", "blood", "broken", "very", "pass", "next", "forget", "tree", "wrong", "air", "mother", "understand", "lip", "hit", "wall", "memory", "sleep", "free", "high", "realize", "school", "might", "skin", "sweet", "perfect", "blue", "kill", "breath", "dance", "against", "fly", "between", "grow", "strong", "under", "listen", "bring", "sometimes", "speak", "pull", "person", "become", "family", "begin", "ground", "real", "small", "father", "sure", "feet", "rest", "young", "finally", "land", "across", "today", "different", "guy", "line", "fire", "reason", "reach", "second", "slowly", "write", "eat", "smell", "mouth", "step", "learn", "three", "floor", "promise", "breathe", "darkness", "push", "earth", "guess", "save", "song", "above", "along", "both", "color", "house", "almost", "sorry", "anymore", "brother", "okay", "dear", "game", "fade", "already", "apart", "warm", "beauty", "heard", "notice", "question", "shine", "began", "piece", "whole", "shadow", "secret", "street", "within", "finger", "point", "morning", "whisper", "child", "moon", "green", "story", "glass", "kid", "silence", "since", "soft", "yourself", "empty", "shall", "angel", "answer", "baby", "bright", "dad", "path", "worry", "hour", "drop", "follow", "power", "war", "half", "flow", "heaven", "act", "chance", "fact", "least", "tired", "children", "near", "quite", "afraid", "rise", "sea", "taste", "window", "cover", "nice", "trust", "lot", "sad", "cool", "force", "peace", "return", "blind", "easy", "ready", "roll", "rose", "drive", "held", "music", "beneath", "hang", "mom", "paint", "emotion", "quiet", "clear", "cloud", "few", "pretty", "bird", "outside", "paper", "picture", "front", "rock", "simple", "anyone", "meant", "reality", "road", "sense", "waste", "bit", "leaf", "thank", "happiness", "meet", "men", "smoke", "truly", "decide", "self", "age", "book", "form", "alive", "carry", "escape", "damn", "instead", "able", "ice", "minute", "throw", "catch", "leg", "ring", "course", "goodbye", "lead", "poem", "sick", "corner", "desire", "known", "problem", "remind", "shoulder", "suppose", "toward", "wave", "drink", "jump", "woman", "pretend", "sister", "week", "human", "joy", "crack", "grey", "pray", "surprise", "dry", "knee", "less", "search", "bleed", "caught", "clean", "embrace", "future", "king", "son", "sorrow", "chest", "hug", "remain", "sat", "worth", "blow", "daddy", "final", "parent", "tight", "also", "create", "lonely", "safe", "cross", "dress", "evil", "silent", "bone", "fate", "perhaps", "anger", "class", "scar", "snow", "tiny", "tonight", "continue", "control", "dog", "edge", "mirror", "month", "suddenly", "comfort", "given", "loud", "quickly", "gaze", "plan", "rush", "stone", "town", "battle", "ignore", "spirit", "stood", "stupid", "yours", "brown", "build", "dust", "hey", "kept", "pay", "phone", "twist", "although", "ball", "beyond", "hidden", "nose", "taken", "fail", "float", "pure", "somehow", "wash", "wrap", "angry", "cheek", "creature", "forgotten", "heat", "rip", "single", "space", "special", "weak", "whatever", "yell", "anyway", "blame", "job", "choose", "country", "curse", "drift", "echo", "figure", "grew", "laughter", "neck", "suffer", "worse", "yeah", "disappear", "foot", "forward", "knife", "mess", "somewhere", "stomach", "storm", "beg", "idea", "lift", "offer", "breeze", "field", "five", "often", "simply", "stuck", "win", "allow", "confuse", "enjoy", "except", "flower", "seek", "strength", "calm", "grin", "gun", "heavy", "hill", "large", "ocean", "shoe", "sigh", "straight", "summer", "tongue", "accept", "crazy", "everyday", "exist", "grass", "mistake", "sent", "shut", "surround", "table", "ache", "brain", "destroy", "heal", "nature", "shout", "sign", "stain", "choice", "doubt", "glance", "glow", "mountain", "queen", "stranger", "throat", "tomorrow", "city", "either", "fish", "flame", "rather", "shape", "spin", "spread", "ash", "distance", "finish", "image", "imagine", "important", "nobody", "shatter", "warmth", "became", "feed", "flesh", "funny", "lust", "shirt", "trouble", "yellow", "attention", "bare", "bite", "money", "protect", "amaze", "appear", "born", "choke", "completely", "daughter", "fresh", "friendship", "gentle", "probably", "six", "deserve", "expect", "grab", "middle", "nightmare", "river", "thousand", "weight", "worst", "wound", "barely", "bottle", "cream", "regret", "relationship", "stick", "test", "crush", "endless", "fault", "itself", "rule", "spill", "art", "circle", "join", "kick", "mask", "master", "passion", "quick", "raise", "smooth", "unless", "wander", "actually", "broke", "chair", "deal", "favorite", "gift", "note", "number", "sweat", "box", "chill", "clothes", "lady", "mark", "park", "poor", "sadness", "tie", "animal", "belong", "brush", "consume", "dawn", "forest", "innocent", "pen", "pride", "stream", "thick", "clay", "complete", "count", "draw", "faith", "press", "silver", "struggle", "surface", "taught", "teach", "wet", "bless", "chase", "climb", "enter", "letter", "melt", "metal", "movie", "stretch", "swing", "vision", "wife", "beside", "crash", "forgot", "guide", "haunt", "joke", "knock", "plant", "pour", "prove", "reveal", "steal", "stuff", "trip", "wood", "wrist", "bother", "bottom", "crawl", "crowd", "fix", "forgive", "frown", "grace", "loose", "lucky", "party", "release", "surely", "survive", "teacher", "gently", "grip", "speed", "suicide", "travel", "treat", "vein", "written", "cage", "chain", "conversation", "date", "enemy", "however", "interest", "million", "page", "pink", "proud", "sway", "themselves", "winter", "church", "cruel", "cup", "demon", "experience", "freedom", "pair", "pop", "purpose", "respect", "shoot", "softly", "state", "strange", "bar", "birth", "curl", "dirt", "excuse", "lord", "lovely", "monster", "order", "pack", "pants", "pool", "scene", "seven", "shame", "slide", "ugly", "among", "blade", "blonde", "closet", "creek", "deny", "drug", "eternity", "gain", "grade", "handle", "key", "linger", "pale", "prepare", "swallow", "swim", "tremble", "wheel", "won", "cast", "cigarette", "claim", "college", "direction", "dirty", "gather", "ghost", "hundred", "loss", "lung", "orange", "present", "swear", "swirl", "twice", "wild", "bitter", "blanket", "doctor", "everywhere", "flash", "grown", "knowledge", "numb", "pressure", "radio", "repeat", "ruin", "spend", "unknown", "buy", "clock", "devil", "early", "false", "fantasy", "pound", "precious", "refuse", "sheet", "teeth", "welcome", "add", "ahead", "block", "bury", "caress", "content", "depth", "despite", "distant", "marry", "purple", "threw", "whenever", "bomb", "dull", "easily", "grasp", "hospital", "innocence", "normal", "receive", "reply", "rhyme", "shade", "someday", "sword", "toe", "visit", "asleep", "bought", "center", "consider", "flat", "hero", "history", "ink", "insane", "muscle", "mystery", "pocket", "reflection", "shove", "silently", "smart", "soldier", "spot", "stress", "train", "type", "view", "whether", "bus", "energy", "explain", "holy", "hunger", "inch", "magic", "mix", "noise", "nowhere", "prayer", "presence", "shock", "snap", "spider", "study", "thunder", "trail", "admit", "agree", "bag", "bang", "bound", "butterfly", "cute", "exactly", "explode", "familiar", "fold", "further", "pierce", "reflect", "scent", "selfish", "sharp", "sink", "spring", "stumble", "universe", "weep", "women", "wonderful", "action", "ancient", "attempt", "avoid", "birthday", "branch", "chocolate", "core", "depress", "drunk", "especially", "focus", "fruit", "honest", "match", "palm", "perfectly", "pillow", "pity", "poison", "roar", "shift", "slightly", "thump", "truck", "tune", "twenty", "unable", "wipe", "wrote", "coat", "constant", "dinner", "drove", "egg", "eternal", "flight", "flood", "frame", "freak", "gasp", "glad", "hollow", "motion", "peer", "plastic", "root", "screen", "season", "sting", "strike", "team", "unlike", "victim", "volume", "warn", "weird", "attack", "await", "awake", "built", "charm", "crave", "despair", "fought", "grant", "grief", "horse", "limit", "message", "ripple", "sanity", "scatter", "serve", "split", "string", "trick", "annoy", "blur", "boat", "brave", "clearly", "cling", "connect", "fist", "forth", "imagination", "iron", "jock", "judge", "lesson", "milk", "misery", "nail", "naked", "ourselves", "poet", "possible", "princess", "sail", "size", "snake", "society", "stroke", "torture", "toss", "trace", "wise", "bloom", "bullet", "cell", "check", "cost", "darling", "during", "footstep", "fragile", "hallway", "hardly", "horizon", "invisible", "journey", "midnight", "mud", "nod", "pause", "relax", "shiver", "sudden", "value", "youth", "abuse", "admire", "blink", "breast", "bruise", "constantly", "couple", "creep", "curve", "difference", "dumb", "emptiness", "gotta", "honor", "plain", "planet", "recall", "rub", "ship", "slam", "soar", "somebody", "tightly", "weather", "adore", "approach", "bond", "bread", "burst", "candle", "coffee", "cousin", "crime", "desert", "flutter", "frozen", "grand", "heel", "hello", "language", "level", "movement", "pleasure", "powerful", "random", "rhythm", "settle", "silly", "slap", "sort", "spoken", "steel", "threaten", "tumble", "upset", "aside", "awkward", "bee", "blank", "board", "button", "card", "carefully", "complain", "crap", "deeply", "discover", "drag", "dread", "effort", "entire", "fairy", "giant", "gotten", "greet", "illusion", "jeans", "leap", "liquid", "march", "mend", "nervous", "nine", "replace", "rope", "spine", "stole", "terror", "accident", "apple", "balance", "boom", "childhood", "collect", "demand", "depression", "eventually", "faint", "glare", "goal", "group", "honey", "kitchen", "laid", "limb", "machine", "mere", "mold", "murder", "nerve", "painful", "poetry", "prince", "rabbit", "shelter", "shore", "shower", "soothe", "stair", "steady", "sunlight", "tangle", "tease", "treasure", "uncle", "begun", "bliss", "canvas", "cheer", "claw", "clutch", "commit", "crimson", "crystal", "delight", "doll", "existence", "express", "fog", "football", "gay", "goose", "guard", "hatred", "illuminate", "mass", "math", "mourn", "rich", "rough", "skip", "stir", "student", "style", "support", "thorn", "tough", "yard", "yearn", "yesterday", "advice", "appreciate", "autumn", "bank", "beam", "bowl", "capture", "carve", "collapse", "confusion", "creation", "dove", "feather", "girlfriend", "glory", "government", "harsh", "hop", "inner", "loser", "moonlight", "neighbor", "neither", "peach", "pig", "praise", "screw", "shield", "shimmer", "sneak", "stab", "subject", "throughout", "thrown", "tower", "twirl", "wow", "army", "arrive", "bathroom", "bump", "cease", "cookie", "couch", "courage", "dim", "guilt", "howl", "hum", "husband", "insult", "led", "lunch", "mock", "mostly", "natural", "nearly", "needle", "nerd", "peaceful", "perfection", "pile", "price", "remove", "roam", "sanctuary", "serious", "shiny", "shook", "sob", "stolen", "tap", "vain", "void", "warrior", "wrinkle", "affection", "apologize", "blossom", "bounce", "bridge", "cheap", "crumble", "decision", "descend", "desperately", "dig", "dot", "flip", "frighten", "heartbeat", "huge", "lazy", "lick", "odd", "opinion", "process", "puzzle", "quietly", "retreat", "score", "sentence", "separate", "situation", "skill", "soak", "square", "stray", "taint", "task", "tide", "underneath", "veil", "whistle", "anywhere", "bedroom", "bid", "bloody", "burden", "careful", "compare", "concern", "curtain", "decay", "defeat", "describe", "double", "dreamer", "driver", "dwell", "evening", "flare", "flicker", "grandma", "guitar", "harm", "horrible", "hungry", "indeed", "lace", "melody", "monkey", "nation", "object", "obviously", "rainbow", "salt", "scratch", "shown", "shy", "stage", "stun", "third", "tickle", "useless", "weakness", "worship", "worthless", "afternoon", "beard", "boyfriend", "bubble", "busy", "certain", "chin", "concrete", "desk", "diamond", "doom", "drawn", "due", "felicity", "freeze", "frost", "garden", "glide", "harmony", "hopefully", "hunt", "jealous", "lightning", "mama", "mercy", "peel", "physical", "position", "pulse", "punch", "quit", "rant", "respond", "salty", "sane", "satisfy", "savior", "sheep", "slept", "social", "sport", "tuck", "utter", "valley", "wolf", "aim", "alas", "alter", "arrow", "awaken", "beaten", "belief", "brand", "ceiling", "cheese", "clue", "confidence", "connection", "daily", "disguise", "eager", "erase", "essence", "everytime", "expression", "fan", "flag", "flirt", "foul", "fur", "giggle", "glorious", "ignorance", "law", "lifeless", "measure", "mighty", "muse", "north", "opposite", "paradise", "patience", "patient", "pencil", "petal", "plate", "ponder", "possibly", "practice", "slice", "spell", "stock", "strife", "strip", "suffocate", "suit", "tender", "tool", "trade", "velvet", "verse", "waist", "witch", "aunt", "bench", "bold", "cap", "certainly", "click", "companion", "creator", "dart", "delicate", "determine", "dish", "dragon", "drama", "drum", "dude", "everybody", "feast", "forehead", "former", "fright", "fully", "gas", "hook", "hurl", "invite", "juice", "manage", "moral", "possess", "raw", "rebel", "royal", "scale", "scary", "several", "slight", "stubborn", "swell", "talent", "tea", "terrible", "thread", "torment", "trickle", "usually", "vast", "violence", "weave", "acid", "agony", "ashamed", "awe", "belly", "blend", "blush", "character", "cheat", "common", "company", "coward", "creak", "danger", "deadly", "defense", "define", "depend", "desperate", "destination", "dew", "duck", "dusty", "embarrass", "engine", "example", "explore", "foe", "freely", "frustrate", "generation", "glove", "guilty", "health", "hurry", "idiot", "impossible", "inhale", "jaw", "kingdom", "mention", "mist", "moan", "mumble", "mutter", "observe", "ode", "pathetic", "pattern", "pie", "prefer", "puff", "rape", "rare", "revenge", "rude", "scrape", "spiral", "squeeze", "strain", "sunset", "suspend", "sympathy", "thigh", "throne", "total", "unseen", "weapon", "weary"]
    words: ["unabated", "scabbiness", "usability", "diabolos", "placate", "reaccompanying", "traceless", "spacewomen", "beachheads", "acacia", "graciously", "blackened", "smacking", "blackout", "diaconal", "bracted", "deactivate", "evacuator", "readapted", "readdressed", "tradeoff", "headgears", "leading", "beadle", "gladness", "quadrat", "quadrupole", "toadstools", "beadwork", "praetor", "chaffinch", "kraft", "slag", "imagery", "draggier", "plagiary", "fragmentarily", "flagpole", "cragsmen", "goahead", "availabilities", "swain", "stainless", "brainwashers", "praised", "slakable", "quaker", "awaking", "meal", "coalboxes", "staleness", "amalgamators", "realigns", "egalite", "stalled", "scalloper", "goalmouth", "realpolitik", "wealthier", "analysers", "dramamine", "chamberpots", "shameless", "frameworks", "chamiso", "flamming", "glamour", "stampings", "flams", "wean", "nuance", "cranching", "uganda", "grandees", "blandish", "standpoints", "lianes", "evangelism", "twangles", "reanimation", "crank", "cranking", "flannelet", "granola", "transactions", "transferral", "transience", "transmigrated", "transplantations", "plantain", "shanties", "grantsmanship", "soap", "chapel", "graph", "seaplane", "clapped", "snappish", "crappy", "adapted", "ajar", "guarani", "starchier", "guardianship", "blared", "wearers", "fearfuller", "clarification", "wearing", "czaritzas", "charlatanries", "alarm", "swarms", "sharpshooting", "afars", "nearsightedly", "charterers", "scarting", "alarum", "spas", "teased", "smash", "brashest", "flashy", "chasmal", "exasperating", "brasserie", "classifications", "classroom", "roaster", "yeastier", "plastron", "spat", "elate", "chatelaine", "fraternized", "flatfoots", "goatherds", "swathes", "statices", "platinums", "meatless", "oratorically", "seats", "flattening", "spatters", "gratuitous", "beau", "inaugurated", "clausal", "travailed", "travelogue", "slavering", "clavichords", "gravitations", "heavyweights", "chawers", "crawly", "ataxia", "playboys", "graying", "trays", "blazes", "frazzling", "abbacies", "imbalmed", "lebanon", "embarring", "embattling", "robbed", "lobbers", "bobbinets", "gabble", "cobbles", "gibbons", "hubcaps", "subculture", "lobe", "albeit", "rebellion", "liberalism", "siberians", "libertarian", "subfunction", "cubics", "jubilantly", "mobilizers", "cubists", "arbitration", "subjugated", "emblematical", "tableware", "gabling", "submergence", "cabob", "bobolink", "subordinate", "ribose", "abbotship", "subphyla", "vibrancy", "subregional", "unbridged", "fibroblast", "embryologist", "subscripted", "subsonic", "substrates", "subtotal", "rebukers", "nebulosity", "ambuscade", "subverter", "orc", "decaffeinates", "recalculates", "vocalizing", "uncannier", "escapes", "nicaraguans", "escars", "vacationed", "baccalaureates", "zucchinis", "succumber", "seceder", "deceiving", "pacemen", "licensor", "accentuation", "deceptively", "lucern", "incessantly", "facet", "enchaining", "mechanize", "unchartered", "bachelors", "leches", "techies", "architectonics", "technological", "lachrymation", "sociable", "accidents", "pacifiers", "oscillatory", "vicing", "occipital", "vicissitude", "tacitness", "mockable", "backbend", "hocked", "hacker", "cockers", "picketer", "lackey", "buckhound", "hocking", "necklace", "pickles", "hackman", "jockos", "hecks", "rickshaw", "backstops", "duckweed", "reclaims", "macle", "ecclesiastics", "cyclists", "unclothing", "arco", "excogitate", "recoinage", "recomb", "recommissioned", "accompanists", "incompliancies", "decompressive", "seconded", "decongests", "inconsiderateness", "reconsulted", "reconvenes", "cacophonous", "encoring", "picosecond", "recouping", "decoys", "decreasing", "decrepit", "ascribing", "encroach", "macroeconomics", "micronesian", "necrosis", "recrudesced", "secs", "lactation", "rectification", "auctioneer", "tectonics", "factorize", "unctuous", "escudo", "esculent", "encumbers", "vacuolate", "uncurious", "locus", "accustomed", "bed", "audacity", "pedaling", "lidar", "tidbits", "nodded", "dodderer", "middies", "peddlar", "huddler", "puddlier", "teddy", "undebatable", "jaded", "codein", "yodelling", "laden", "rodeo", "ruder", "federatively", "underdrawers", "underground", "modernising", "underripened", "understander", "underwriter", "undesirably", "undetected", "bedewed", "wedge", "nudger", "widgets", "godheads", "radiates", "medicares", "medicinal", "iodides", "redigested", "ordinands", "radiochemist", "radioscopic", "wadis", "sadism", "undistributed", "auditories", "iodize", "oodles", "aidmen", "midnights", "undoings", "hedonics", "ordos", "godparents", "redraw", "aldrin", "hydrolyses", "redrying", "padshah", "midterm", "reducing", "endue", "sedulously", "medusan", "godwit", "ape", "urea", "stead", "treadles", "freaked", "creaks", "stealth", "gleams", "queans", "smearers", "unearthly", "greasiest", "uneasy", "greatgrandmothers", "ideations", "preaxial", "prebilling", "msec", "precelebration", "liechtenstein", "preciosity", "checkers", "greco", "execrably", "erective", "electrodynamic", "spectrophotometer", "caecum", "reed", "predeceased", "predetermined", "predication", "predisposes", "credo", "deedy", "greed", "speedwell", "freelanced", "gleemen", "greening", "sweepers", "sleepwalk", "cheerless", "fleet", "sweetness", "tweezers", "beefeater", "prefixion", "omegas", "diehards", "freightyard", "theist", "seeking", "kielbasy", "speleologists", "beelike", "shellacks", "smelling", "dwelt", "edelweiss", "reembarking", "clemently", "blemishes", "daemon", "exemplars", "hyena", "thenceforth", "stenchy", "trendiest", "opener", "teenier", "viennese", "phenotypically", "reentered", "identifying", "frenzies", "ideologizing", "creosoted", "teepee", "toepieces", "steppers", "scepticism", "frequenters", "overachieve", "hierarchic", "overbalanced", "amerced", "overcompensators", "overdiversity", "prerecord", "thereof", "theretofore", "overfilling", "everglades", "clericalist", "sterilized", "overintense", "overlavish", "spermatocide", "sperms", "acerose", "overprompt", "overrighteously", "oversalted", "aversive", "overstock", "overthrowers", "cherty", "overwintering", "goes", "blesbok", "tuesday", "freshen", "presifts", "inessential", "pressurise", "chestfuls", "chestnuts", "beet", "dieted", "blether", "meetinghouse", "teetotaller", "prettily", "pseudomodern", "aneurism", "elevating", "brevetcies", "brew", "dyeweed", "viewpoints", "unexcused", "unexplainably", "abeyances", "oaf", "alfalfas", "nefariousness", "infeasibility", "infections", "lifeguards", "safeness", "deferent", "unfertilized", "lifeway", "caffein", "jeffersonian", "daffiness", "raffler", "suffragette", "offhanded", "officiously", "infilling", "infinitely", "elfish", "inflammabilities", "deflective", "inflicts", "influenza", "enfolding", "unforested", "deformer", "refractionist", "defrayable", "infringe", "waft", "lefthandedly", "daftness", "refugee", "unfurling", "refuted", "alga", "regaining", "megalopolis", "organismal", "vagaries", "legateships", "gigawatt", "aegean", "hegemon", "ingenious", "tiger", "vigesimal", "bugeye", "bogged", "fogger", "doggery", "soggiest", "muggings", "jogglers", "doggonest", "jughead", "sighs", "fighter", "highting", "wights", "orgic", "sigil", "paginate", "legionary", "logistics", "legitimization", "dogleg", "english", "bagman", "pygmyisms", "signee", "significances", "cognition", "hognuts", "dogood", "ungot", "bagpiper", "vagrancy", "degree", "regrets", "engrosses", "pugs", "dogtrots", "beguile", "regulating", "regurgitated", "dogwoods", "rehabilitator", "bahamas", "rehardening", "behaviour", "aahed", "schemed", "adherence", "spherometer", "inhibitor", "nihilities", "schistose", "ashman", "echoism", "yahooism", "aphorisms", "kwhr", "bahts", "schwas", "sri", "pliancies", "opiates", "quibbling", "uric", "voiceless", "trichlorethylenes", "chickasaws", "cricket", "prickling", "sticky", "pricy", "griddlecake", "maidenhair", "bridesmaids", "oxidised", "saids", "briefly", "friendliness", "twier", "quieters", "skiff", "sniffling", "coifing", "swiftest", "brigandage", "wrigglier", "heightened", "brighton", "stigmatize", "epigones", "xxii", "bailable", "childbed", "smiled", "railes", "boiling", "bailiwick", "stiller", "trillion", "trilogy", "foils", "guiltlessness", "animadverts", "climaxes", "chimes", "criminologic", "tzimmes", "unimpeachability", "skimpy", "blimy", "ruinations", "coincidence", "blindfolding", "amine", "shiner", "reinflames", "sling", "twinging", "clinicians", "trinitarian", "stinkier", "mainlanders", "whinnied", "ruinously", "twinship", "coinsuring", "unintendedly", "pointier", "printmakers", "chintz", "whiny", "deionization", "idiotic", "snipes", "chipmunks", "chippering", "trippings", "shipt", "cliquiest", "smirches", "heiress", "quirkier", "twirly", "hairraising", "hairstylist", "hairy", "trisect", "knish", "triskaidekaphobia", "prismoid", "whispery", "scissored", "existentialist", "epistle", "moisturise", "britain", "switchblade", "gaited", "loiters", "whithersoever", "critic", "british", "editorializer", "fritted", "flitting", "switzerland", "shivas", "stiver", "trivial", "prix", "arizonians", "frizzling", "abjection", "jujitsu", "majored", "injudiciously", "unjust", "alkaline", "lake", "wakeful", "lakeport", "mikes", "saki", "poking", "auklets", "yuks", "eel", "lilac", "palaeographic", "calamities", "melanites", "enlarged", "polars", "belatedly", "relationships", "malawians", "ablaze", "calcareously", "calcined", "calculi", "wildebeest", "molders", "holdings", "goldsmiths", "beleaguer", "celebratory", "axled", "malefic", "illegible", "alleluias", "silencing", "volente", "teleplays", "allergist", "poles", "polestars", "relets", "televisionary", "selfdestruction", "fulfilment", "calfskin", "calgary", "reliable", "calibrates", "policing", "relicts", "beliefs", "vilification", "enlightener", "soliloquize", "delineate", "tilings", "polio", "ellipsis", "palish", "militarised", "politician", "bolivars", "polkaed", "walkietalkie", "milkshakes", "mall", "collaborative", "wallah", "cellaring", "wellbehaved", "bulldozes", "hilled", "sullenest", "cullers", "billeting", "bullfighters", "billiard", "gillied", "nullifications", "pollinated", "lullingly", "fillips", "wellknown", "hillocks", "walloping", "hallow", "pillowing", "bullpens", "nills", "hallucinational", "hillwalking", "bullyboys", "bullyrag", "culminated", "talmudists", "kilobytes", "malodorous", "xylography", "colones", "nylons", "colorant", "colorism", "colossuses", "colouration", "culpa", "dolphins", "gulps", "oilseed", "fulsomely", "meltage", "melter", "malthusian", "multimolecular", "multipolar", "saltpans", "wilts", "soluble", "illumes", "voluptuary", "balustered", "splutters", "sylvans", "pulverised", "sylvius", "polydactylous", "polynesian", "gum", "remade", "remails", "pomanders", "romanizes", "unmapped", "somas", "hematologist", "timbals", "wombed", "lumbers", "numbingly", "rumbler", "limbo", "mambos", "lambswool", "humdrum", "namecalling", "homefolk", "camels", "armenians", "unmentionables", "homer", "homerooms", "timeserver", "jamestown", "homeworks", "gamic", "semideserts", "semiformal", "familiarity", "liminal", "nominatively", "naming", "administrants", "semiotic", "famishes", "limited", "admitter", "gimlet", "summarised", "commemorative", "commercialised", "dimmest", "comminatory", "committed", "mammons", "communitarian", "hymnaries", "samoa", "remodels", "demographer", "zymology", "demonist", "demonstrators", "immorally", "hemorrhages", "atmospheres", "armourers", "temp", "timpanists", "sympathies", "compellingly", "compered", "competently", "lymphosarcoma", "tamping", "complement", "complicatedly", "dampness", "composer", "compressive", "campstool", "campuses", "cams", "almsman", "simultaneousness", "immunosuppression", "dimwits", "san", "menace", "gonads", "synagog", "finalists", "dynamical", "synapse", "nonassertively", "conation", "sunback", "pancaking", "concedes", "fencepost", "concertized", "lynched", "lunching", "synchs", "fencing", "zincoid", "nonconstructive", "rancours", "functionary", "pincushions", "bandager", "hondas", "windbreaks", "vendees", "pendents", "sunderers", "banders", "handfast", "handicapped", "handiest", "punditic", "fondlers", "bondman", "randomize", "windowshopping", "dendrite", "landscapes", "conducers", "sandwort", "tone", "gynecologist", "benefactor", "reneged", "paneling", "lineouts", "mineralizing", "innerly", "hones", "linesmen", "venetians", "nonevent", "moneybag", "nonfascist", "confidantes", "confiscatory", "conforming", "confuter", "hungarian", "dunged", "dungeon", "congers", "lungful", "ranginess", "dangled", "ringlets", "wingman", "fungous", "congruences", "gangster", "sanguinary", "wingy", "mini", "manic", "minicomputers", "monies", "benignant", "liniment", "wining", "amnions", "meniscoid", "ministates", "finites", "finitude", "bonjour", "rank", "funker", "rankest", "kinkiness", "bunkmates", "bankside", "nonliving", "jinn", "nonnavigable", "runnel", "canners", "sonnetted", "sunniest", "gunnings", "cannonism", "sannyasi", "monochromatically", "manoeuvrable", "xenolithic", "denominationally", "nonoperable", "honorables", "sonorous", "denotations", "denouncer", "innoxious", "nonplusses", "conquerors", "nonresidential", "mins", "sensations", "linseeds", "menservants", "sonships", "lensing", "sensitometers", "winsomeness", "conspicuously", "constituted", "construable", "nonsuches", "mensuration", "pinta", "container", "contaminator", "tentative", "contemplate", "banter", "winterly", "xanthate", "pontiac", "ventilators", "bunting", "mentioners", "conto", "cantos", "contraindicative", "contravenes", "centrism", "hints", "contused", "minuend", "annum", "tenuously", "minutes", "conventionality", "conveyer", "convulse", "kenyan", "canzonet", "broadening", "groaned", "probable", "globe", "unobstructed", "floccules", "trochaics", "blockades", "stockiest", "clockwork", "procreated", "procuress", "plodders", "geodesics", "anodizes", "deodorants", "exodus", "shoelace", "profane", "scoffed", "profiters", "exogamy", "cloggiest", "programmable", "boogyman", "avoids", "anointment", "shojis", "cooker", "kookiest", "looks", "prolapsing", "gaoled", "violet", "hooliganism", "prolixly", "drolly", "geologist", "idols", "stomachically", "rhombic", "geometric", "prominently", "gnomonic", "promptitude", "krona", "broncos", "stoneflies", "stonewalls", "spongy", "atoningly", "ironlady", "phonophotography", "sponsorial", "ironwork", "brooders", "bloodsucking", "brooking", "gloomings", "whoopees", "floorings", "snooting", "propagational", "reopen", "tropes", "biophysics", "dropkicks", "proposers", "floppiest", "glops", "stopwatch", "florally", "chorded", "spored", "florescence", "gloria", "snoring", "doormats", "amoroso", "shortchange", "shortish", "quorums", "grosbeaks", "closefisted", "goosey", "prosodic", "crossbows", "crossings", "prostates", "frostlike", "moot", "blotchier", "proteins", "footgear", "soothers", "soothsayers", "tooting", "spotlessness", "photoelectricity", "isotonically", "prototypical", "loots", "glottides", "footy", "grouchy", "droughts", "groundnuts", "flourish", "knout", "clouts", "proven", "provider", "plowable", "crowdies", "flowerpot", "meowing", "snowmobile", "browny", "drowsier", "deoxidizer", "frozenly", "sop", "repackages", "copal", "expanding", "reparations", "bipartisan", "pupate", "repaves", "supe", "typecase", "toped", "pipefuls", "impels", "copenhagen", "raper", "unperceiving", "supererogation", "experiencing", "imperishably", "hyperpituitary", "hypersensitive", "superstructures", "imperviousness", "dopester", "capful", "emphatic", "sophist", "amphorae", "impi", "cupidinously", "pupilar", "hoping", "aspirated", "papistries", "pipkins", "replanted", "replenisher", "explicate", "amplifications", "deplorable", "unplug", "hypochondriac", "unpoised", "copolymerizing", "soporifics", "importing", "reposed", "impositions", "hypotension", "expounders", "capped", "gypper", "lappers", "poppied", "napping", "rippler", "supportive", "tippy", "deprecates", "unpredictably", "representation", "impressionism", "reprice", "reprises", "approbation", "deprogrammers", "improprieties", "unprovoked", "yips", "topspin", "captained", "captious", "septums", "repudiator", "sepulchrally", "impurely", "imputing", "papyruses", "sequenced", "coquettes", "esquire", "inquisitor", "per", "caracas", "abrade", "paraffins", "sarah", "upraises", "moralities", "scram", "paramountly", "haranguer", "karaoke", "parapsychologists", "parasitised", "carate", "berating", "stratospherically", "sprawl", "kerb", "sorbate", "morbid", "herbivores", "forboded", "verboten", "mercantilistic", "larcenist", "torch", "marchesa", "circlers", "circuit", "circumflex", "percussion", "hardbacks", "hardeners", "hardhandedness", "cordilleran", "cardiotherapies", "pardonable", "yards", "curdy", "unread", "streamier", "bureaucratically", "cerebrals", "unrecompensed", "gored", "reredos", "screenplays", "forefinger", "peregrinations", "foreigners", "dereliction", "ceremonies", "strengtheners", "aureolae", "unreprimanded", "forerun", "unresentful", "corespondent", "foresters", "pyrethrum", "shreveport", "strewn", "perfectability", "kerfing", "perfunctorily", "sergeant", "vergers", "marginalise", "gargles", "warhead", "serialize", "scribbling", "lyricize", "abridge", "eerier", "verified", "sprightliest", "perilling", "purims", "faring", "firings", "periodontitis", "striplings", "parish", "christianized", "irritates", "unrivaled", "periwinkle", "workbook", "corkers", "perkiest", "murkly", "larkspurs", "worldlier", "girlhood", "darlings", "barlows", "formal", "gormandize", "formats", "harmer", "barmie", "terminus", "warmness", "surmount", "permutationist", "carnality", "durned", "earnest", "cornier", "tarnishes", "darns", "byroad", "stroboscopic", "faroff", "heroin", "rerolled", "pyromaniacal", "aaron", "strongman", "strontium", "stropping", "aerosols", "aground", "pyroxene", "turpentine", "morphinic", "earplug", "surpriser", "parquets", "curran", "correality", "surrenderee", "myrrh", "carried", "merriest", "barrio", "ferromagnetic", "ferrotype", "narrowness", "corruptor", "carryout", "bursaries", "horseflies", "nurserymaids", "harshens", "versifiers", "oarsmanship", "torsos", "persuadably", "tort", "tartare", "portentous", "mortgagor", "mirthful", "girths", "verticals", "portieres", "fertility", "partisanship", "cartloads", "portrayal", "fortuitously", "forty", "strudel", "strummer", "irruptions", "scrutable", "parve", "nerves", "curviest", "nervously", "airworthier", "larynges", "ens", "disabuse", "assagais", "desalinize", "desand", "misappropriations", "assassinate", "assayed", "disbelieving", "miscall", "miscellaneousness", "discharged", "rescinds", "discloser", "disconcert", "miscopying", "discoverable", "discriminated", "muscularly", "discussions", "base", "unseaworthy", "bisects", "assegai", "resellers", "casements", "arsenic", "disenthrall", "miser", "assertors", "esses", "onset", "casework", "disfranchised", "bush", "disharmony", "unsheathing", "pusher", "wishes", "mushiest", "cushion", "kashmir", "fishpond", "fishways", "desiccator", "residually", "ossify", "insignias", "desilvered", "disinfectant", "rosinous", "visioning", "resistivity", "visitress", "risked", "deskilling", "ensky", "mislike", "mismarks", "jasmine", "bismuthic", "masochism", "insole", "unsolved", "arsonist", "disorganising", "unsought", "disparagements", "suspecter", "suspensive", "auspiciousness", "despised", "displeasing", "disports", "disproportionate", "masquerading", "misrepresentee", "kissable", "dissatisfied", "vessel", "mosser", "possessing", "dissidence", "fossilized", "hissings", "passive", "dissolute", "misspoke", "lossy", "destabilise", "wastages", "testament", "bastardizations", "restating", "baste", "tasteful", "systems", "noster", "hysteric", "easterners", "gestes", "dustheap", "justiceship", "nastiest", "vestigially", "testily", "besting", "destining", "aestivate", "restless", "fastnesses", "customizing", "restoring", "abstractionist", "castrations", "distribution", "upstrokes", "destructor", "mistrusts", "restudy", "disturbers", "mistypings", "resubstitute", "bisulfide", "disuniter", "insurers", "susurrus", "answerability", "fat", "vita", "metabolize", "hetaerae", "detailing", "retake", "metalists", "catalogue", "metamorphous", "satanist", "dotard", "rotas", "notationally", "fatbacks", "potboys", "matchboxes", "hitchers", "pitchier", "hatchment", "outdates", "citeable", "detectably", "sateens", "gatehouse", "hotelmen"]

};