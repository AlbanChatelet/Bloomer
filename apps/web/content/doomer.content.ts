export type Theme = {
  title: string;
  slug: string;
  hook: string;
  note: string;
  label: string;
  image: string;
  illustrations: {
    image1: string;
    image2: string;
    image3: string;
  };
};

export type ContentBlock =
  | { kind: "text"; title: string; paragraphs: string[] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "actions"; title: string; items: { title: string; desc: string }[] }
  | { kind: "quote"; text: string; author?: string };

export const doomerThemes: Theme[] = [
  {
    title: "Désenchantement & mystère perdu",
    slug: "desenchantement",
    hook: "Quand tout s’explique, le monde se vide.",
    note: "Le réel devient plat : plus de zones floues, moins de fascination.",
    label: "Fondation",
    image: "/doomer/images/monde_plat.jpg",
    illustrations: {
      image1: "/doomer/illustrations/desenchantement/image1.jpg",
      image2: "/doomer/illustrations/desenchantement/image2.jpg",
      image3: "/doomer/illustrations/desenchantement/image3.jpg",
    },
  },
  {
    title: "Dopamine, scroll & saturation",
    slug: "dopamine-scroll",
    hook: "Trop d’images. Trop d’émotions. Rien ne reste.",
    note: "Le cerveau s’épuise, l’attention se fragmente, l’imaginaire se ferme.",
    label: "Système",
    image: "/doomer/images/scrolling_addiction.jpg",
    illustrations: {
      image1: "/doomer/illustrations/dopamine-scroll/image1.jpg",
      image2: "/doomer/illustrations/dopamine-scroll/image2.jpg",
      image3: "/doomer/illustrations/dopamine-scroll/image3.jpg",
    },
  },
  {
    title: "Décors froids & environnements sans âme",
    slug: "decors-froids",
    hook: "Le décor influence l’âme.",
    note: "Neutralité partout : le monde ressemble à une interface.",
    label: "Espace",
    image: "/doomer/images/decors_froids.jpg",
    illustrations: {
      image1: "/doomer/illustrations/decors-froids/image1.jpg",
      image2: "/doomer/illustrations/decors-froids/image2.jpg",
      image3: "/doomer/illustrations/decors-froids/image3.jpg",
    },
  },
  {
    title: "Virtuel infini vs réel limité",
    slug: "virtuel-vs-reel",
    hook: "Ton écran est immense. Ta vie paraît petite.",
    note: "Voir toutes les vies sans bouger crée un décalage frustrant.",
    label: "Décalage",
    image: "/doomer/images/virtuel_infini.jpg",
    illustrations: {
      image1: "/doomer/illustrations/virtuel-vs-reel/image1.jpg",
      image2: "/doomer/illustrations/virtuel-vs-reel/image2.jpg",
      image3: "/doomer/illustrations/virtuel-vs-reel/image3.jpg",
    },
  },
  {
    title: "Perte de sens & fin des grands récits",
    slug: "perte-de-sens",
    hook: "On avance, mais vers quoi ?",
    note: "Moins de transcendance, plus d’optimisation : le quotidien devient sec.",
    label: "Existence",
    image: "/doomer/images/grand_recit.jpg",
    illustrations: {
      image1: "/doomer/illustrations/perte-de-sens/image1.jpg",
      image2: "/doomer/illustrations/perte-de-sens/image2.jpg",
      image3: "/doomer/illustrations/perte-de-sens/image3.jpg",
    },
  },
  {
    title: "Réenchanter son quotidien",
    slug: "reenchanter",
    hook: "Pas de miracle. Des gestes de résistance.",
    note: "Ennui, effort, mains, nature, imaginaire : redonner du relief au réel.",
    label: "Sortie",
    image: "/doomer/images/nature.jpg",
    illustrations: {
      image1: "/doomer/illustrations/reenchanter/image1.jpg",
      image2: "/doomer/illustrations/reenchanter/image2.jpg",
      image3: "/doomer/illustrations/reenchanter/image3.jpg",
    },
  },
];

export const doomerContent: Record<string, ContentBlock[]> = {
  desenchantement: [
    {
      kind: "text",
      title: "Quand l’ennui faisait naître l’imaginaire",
      paragraphs: [
        "Quand on était petit, on était souvent confronté à l’ennui.",
        "On n’avait pas grand-chose pour s’occuper : quelques billes, de vieux jouets, une forêt pas loin, une plaine, parfois même une maison abandonnée.",
        "Et pourtant, on arrivait à s’occuper pendant des heures.",
        "Même les jeux vidéo étaient limités : graphismes approximatifs, bugs, zones floues, mondes imparfaits.",
        "Mais ces défauts techniques étaient compensés par quelque chose de bien plus puissant : notre imagination.",
        "Les limites, les manques et les zones floues laissaient de la place à l’imaginaire.",
      ],
    },

    {
      kind: "text",
      title: "Quand tout devient accessible, expliqué, prévisible",
      paragraphs: [
        "Aujourd’hui, presque tout est accessible en deux clics ou en un prompt.",
        "Tu veux découvrir une forêt ? Tu n’as même plus besoin de t’y rendre : Google Maps, TripAdvisor, photos, avis… tout est déjà là.",
        "Tu te poses une question ? Une IA te donne une réponse immédiate.",
        "Avant, on pouvait être fasciné par des légendes et des rumeurs : des fantômes, des lieux hantés, la Zone 51, des OVNI filmés à l’autre bout du monde.",
        "Aujourd’hui, quelques recherches suffisent pour savoir si c’est truqué, faussé ou expliqué.",
        "À force de tout comprendre, on perd progressivement le goût du mystère.",
      ],
    },

    {
      kind: "text",
      title: "Quand la rationalisation rend le monde plat",
      paragraphs: [
        "Plus on rationalise, plus on explique, plus on calcule, moins il reste de place pour la magie, le sacré ou l’invisible.",
        "À travers les siècles, les mythes et les légendes se sont développés grâce à la méconnaissance, au doute et à la recherche de sens.",
        "Quand tu étais enfant et que tu voyais un arc-en-ciel, tu étais fasciné.",
        "Aujourd’hui, tu sais que ce n’est qu’une réfraction de la lumière sur des gouttes d’eau.",
        "La science est fondamentale, mais le fait que tout soit expliqué rend parfois le monde plat, prévisible et sans saveur.",
      ],
    },

    {
      kind: "quote",
      text: "Plus on éclaire le monde, moins il reste d’ombre pour rêver.",
    },

    {
      kind: "list",
      title: "Signaux typiques",
      items: [
        "Tu comprends rapidement comment les choses fonctionnent, mais elles ne te font plus vibrer.",
        "Les nouveautés te semblent fades ou déjà vues.",
        "Tu consommes du contenu sans rien retenir vraiment.",
        "Tu cherches un frisson, mais il retombe vite.",
        "Même ce qui est censé être impressionnant te laisse indifférent.",
      ],
    },

    {
      kind: "actions",
      title: "Micro-gestes pour rouvrir le mystère",
      items: [
        {
          title: "Accepter de ne pas tout savoir",
          desc: "Regarder, écouter ou vivre quelque chose sans chercher immédiatement à comprendre ou analyser.",
        },
        {
          title: "Laisser une part d’opacité",
          desc: "Choisir des œuvres, des lieux ou des expériences qui résistent, qui ne livrent pas tout d’un coup.",
        },
        {
          title: "Ralentir volontairement",
          desc: "Marcher sans but précis, observer, errer. Le mystère a besoin de temps pour apparaître.",
        },
        {
          title: "Revenir au concret",
          desc: "Un lieu réel, un détail, une texture, une lumière. Le réel reprend de l’épaisseur quand on le touche.",
        },
        {
          title: "Créer un rituel",
          desc: "Lumière basse, musique, silence. Le rituel transforme l’ordinaire en moment chargé.",
        },
      ],
    },
  ],

  // ✅ on remplit ça juste après, thème par thème
  "dopamine-scroll": [
    {
      kind: "text",
      title: "Une minute peut contenir trop de choses",
      paragraphs: [
        "Aujourd’hui, en l’espace d’une seule minute, tu peux voir énormément de choses.",
        "Une vidéo tragique. Une vidéo drôle. Une vidéo de guerre. Une vidéo générée par IA. Une danse. Un message motivant.",
        "Tout s’enchaîne sans pause, sans contexte, sans hiérarchie.",
        "Et au final, cette minute n’a souvent servi à rien d’autre qu’à être consommée.",
      ],
    },

    {
      kind: "text",
      title: "Un cerveau pas fait pour ce rythme",
      paragraphs: [
        "Le cerveau humain n’est pas conçu pour ingurgiter autant d’informations, d’émotions et de stimuli en si peu de temps.",
        "Chaque vidéo déclenche une micro-réaction : surprise, tristesse, rire, colère, envie.",
        "Mais avant même que tu puisses assimiler quelque chose, le contenu suivant arrive déjà.",
        "Rien n’a le temps de s’imprimer. Tout glisse.",
      ],
    },

    {
      kind: "text",
      title: "Quand la dopamine se dérègle",
      paragraphs: [
        "Le scroll fonctionne comme une machine à promesses : « la prochaine sera peut-être meilleure ».",
        "Ton cerveau libère de la dopamine à chaque nouveauté.",
        "Mais plus tu consommes, plus le seuil monte.",
        "Résultat : ce qui te faisait plaisir avant devient fade, insuffisant, trop lent.",
      ],
    },

    {
      kind: "quote",
      text: "Ce n’est pas le contenu qui te manque. C’est la capacité à en profiter.",
    },

    {
      kind: "list",
      title: "Signaux typiques",
      items: [
        "Tu ouvres une application sans vraiment savoir pourquoi.",
        "Tu zappes même des vidéos qui pourraient t’intéresser, parce qu’elles sont trop longues.",
        "Tu as du mal à commencer une tâche sans stimulation (musique, vidéo, téléphone).",
        "Le silence te met mal à l’aise au lieu de te reposer.",
        "Après avoir scrollé, ta vie est toujours la même… mais toi tu te sens plus vide.",
      ],
    },

    {
      kind: "text",
      title: "Ce que le scroll abîme",
      paragraphs: [
        "L’imagination, remplacée par un flux constant d’images toutes faites.",
        "L’attention profonde, nécessaire pour créer, lire, réfléchir ou simplement être présent.",
        "La capacité à apprécier les choses simples, qui paraissent maintenant « pas assez ».",
      ],
    },

    {
      kind: "actions",
      title: "Micro-gestes pour calmer le flux",
      items: [
        {
          title: "Apprendre à finir",
          desc: "Choisir un contenu et aller jusqu’au bout. Une vidéo, un article, un morceau. Réapprendre la notion de fin.",
        },
        {
          title: "Créer de la friction",
          desc: "Rendre l’accès au scroll moins automatique : retirer l’appli de l’accueil, se déconnecter, compliquer légèrement le geste.",
        },
        {
          title: "Laisser des moments sans stimulation",
          desc: "Marcher sans écouteurs, faire la vaisselle sans vidéo, s’ennuyer volontairement.",
        },
        {
          title: "Revenir au corps",
          desc: "Bouger, respirer, ressentir le froid, la chaleur, l’effort. Le corps recale ce que l’écran dérègle.",
        },
        {
          title: "Remplacer, pas juste supprimer",
          desc: "Un rituel simple : musique, lumière basse, silence. Pas pour être productif, juste pour être là.",
        },
      ],
    },

    {
      kind: "text",
      title: "Passer à la suite",
      paragraphs: [
        "Après des heures de scroll, le monde réel peut sembler fade, lent, insuffisant.",
        "Et ce n’est pas seulement une question de contenu.",
        "C’est aussi le décor dans lequel on vit qui commence à peser sur l’âme.",
      ],
    },
  ],
  "decors-froids": [
    {
      kind: "text",
      title: "Quand le décor ne raconte plus rien",
      paragraphs: [
        "Le désenchantement ne vient pas seulement des écrans ou du contenu.",
        "Il vient aussi des lieux dans lesquels on vit.",
        "On a parfois la sensation que les décors d’avant avaient une couleur, une ambiance, une atmosphère à part.",
        "Aujourd’hui, beaucoup d’espaces semblent neutres, lisses, interchangeables.",
        "On traverse des lieux sans qu’ils ne laissent de trace.",
      ],
    },

    {
      kind: "text",
      title: "Des espaces pensés pour fonctionner, pas pour habiter",
      paragraphs: [
        "De plus en plus d’environnements sont pensés pour être efficaces : circuler, consommer, repartir.",
        "Lignes droites, couleurs mates, gris, blanc, matériaux froids.",
        "Tout est propre, épuré, optimisé… mais souvent sans âme.",
        "Ces décors ne nourrissent pas l’imaginaire, ils le calment, voire l’éteignent.",
      ],
    },

    {
      kind: "text",
      title: "Un impact invisible mais réel",
      paragraphs: [
        "Ce n’est pas qu’une impression esthétique.",
        "Il a été montré que des environnements trop froids, trop neutres, trop artificiels peuvent générer du stress, de l’anxiété et une forme de fatigue mentale.",
        "Quand tout se ressemble, le cerveau n’accroche plus.",
        "Moins de repères, moins de souvenirs, moins d’attachement.",
      ],
    },

    {
      kind: "quote",
      text: "Un décor sans aspérités fabrique des journées sans relief.",
    },

    {
      kind: "list",
      title: "Signaux typiques",
      items: [
        "Tu passes dans des lieux « beaux » mais tu ne ressens rien.",
        "Tu oublies rapidement les endroits où tu étais la veille.",
        "Tu te sens plus à l’aise dans l’ancien, le brut, le vécu, que dans le neuf parfait.",
        "Tu as l’impression de vivre dans un décor générique.",
        "Tu cherches inconsciemment des coins, des lumières, des atmosphères… mais tout est plat.",
      ],
    },

    {
      kind: "text",
      title: "Ce que ces décors abîment",
      paragraphs: [
        "La sensation de foyer : un lieu qui te ressemble vraiment.",
        "L’imaginaire : un décor nourrit l’histoire que tu te racontes sur ta vie.",
        "Le calme réel, pas juste l’absence de bruit, mais une forme de douceur.",
        "L’envie de rester, de ralentir, de contempler.",
      ],
    },

    {
      kind: "actions",
      title: "Micro-gestes pour redonner de l’âme au décor",
      items: [
        {
          title: "Créer un coin à toi",
          desc: "Même petit : une lampe chaude, un objet choisi, une ambiance. Un endroit précis change la perception d’un lieu entier.",
        },
        {
          title: "Travailler la lumière avant le reste",
          desc: "Plus chaude, plus basse, plus directionnelle. La lumière transforme un espace sans le reconstruire.",
        },
        {
          title: "Ajouter de la matière vivante",
          desc: "Bois, tissu, plante, papier, céramique. Les matières réelles recalent le cerveau.",
        },
        {
          title: "Laisser une trace personnelle",
          desc: "Photo, affiche, livre, objet trouvé. Pas pour faire joli, mais pour ancrer une histoire.",
        },
        {
          title: "Chercher des lieux chargés",
          desc: "Vieilles rues, cinémas, bibliothèques, friperies, quais, forêts. Pas des espaces standardisés.",
        },
        {
          title: "Réduire le bruit visuel",
          desc: "Enlever 10% de ce que tu vois. Moins de signaux = plus de présence.",
        },
      ],
    },

    {
      kind: "text",
      title: "Passer à la suite",
      paragraphs: [
        "Quand les lieux sont neutres et que l’attention est déjà saturée, on cherche ailleurs.",
        "Et l’endroit le plus accessible pour fuir… c’est l’écran.",
        "Un virtuel infini face à un réel limité.",
      ],
    },
  ],
  "virtuel-vs-reel": [
    {
      kind: "text",
      title: "Un monde immense dans ta poche",
      paragraphs: [
        "Aujourd’hui, ton monde virtuel est immense.",
        "Depuis un téléphone et une connexion internet, tu peux voir tous les paysages, toutes les villes, toutes les cultures.",
        "Tu peux observer des milliers de vies, de corps, de trajectoires, de réussites.",
        "Tout est là, en permanence, accessible instantanément.",
      ],
    },

    {
      kind: "text",
      title: "Un réel beaucoup plus étroit",
      paragraphs: [
        "Mais ton monde réel, lui, est limité.",
        "Surtout quand tu n’as pas énormément de moyens.",
        "Peu de possibilités de voyager, de changer d’air, de décor, de rythme.",
        "Physiquement, ta vie reste souvent au même endroit, au même stade, pendant que ton écran te montre tout ce que tu n’as pas.",
      ],
    },

    {
      kind: "text",
      title: "Le décalage",
      paragraphs: [
        "Ce contraste crée un décalage profondément frustrant pour le cerveau.",
        "Tu compares une vie réelle, lente, imparfaite, à un flux de moments exceptionnels.",
        "Ton quotidien devient insuffisant face à un virtuel infini.",
        "Et sans t’en rendre compte, tu peux commencer à te dévaloriser.",
      ],
    },

    {
      kind: "quote",
      text: "Comparer sa vie réelle à un monde virtuel sans limites est une fatigue silencieuse.",
    },

    {
      kind: "list",
      title: "Signaux typiques",
      items: [
        "Tu as l’impression d’être bloqué pendant que le monde avance.",
        "Tu te compares souvent, même sans le vouloir.",
        "Tu ressens une frustration diffuse, difficile à expliquer.",
        "Tu documentes parfois plus ta vie que tu ne la vis.",
        "Le présent te semble fade comparé à ce que tu vois ailleurs.",
      ],
    },

    {
      kind: "text",
      title: "Ce que ce décalage abîme",
      paragraphs: [
        "L’estime de soi, mise à l’épreuve par la comparaison permanente.",
        "La satisfaction personnelle : rien ne paraît jamais suffisant.",
        "La patience : le réel est lent, l’écran est immédiat.",
        "La capacité à apprécier ce qui est déjà là.",
      ],
    },

    {
      kind: "actions",
      title: "Micro-gestes pour recoller au réel",
      items: [
        {
          title: "Réduire la vitrine",
          desc: "Se désabonner des comptes qui te mettent en manque ou en comparaison constante, sans haine, sans justification.",
        },
        {
          title: "Faire petit mais concret",
          desc: "Une action réelle (sport, création, marche) vaut plus que cent inspirations virtuelles.",
        },
        {
          title: "Tracer ta propre vie",
          desc: "Photos personnelles, notes, journal. Pas pour poster, mais pour voir ton propre chemin.",
        },
        {
          title: "Vivre sans montrer",
          desc: "Faire quelque chose sans le documenter. Juste pour toi. Recréer de l’intimité.",
        },
        {
          title: "Installer des limites visibles",
          desc: "Horaires, routines, moments sans écran. Le cadre redonne de la densité au réel.",
        },
        {
          title: "Revenir au corps",
          desc: "Effort physique, respiration, sensations. Le corps te ramène ici, maintenant.",
        },
      ],
    },

    {
      kind: "text",
      title: "Passer à la suite",
      paragraphs: [
        "Quand la comparaison devient permanente, tout perd de sa valeur.",
        "C’est souvent là qu’une question plus profonde apparaît.",
        "À quoi bon ?",
      ],
    },
  ],
  "perte-de-sens": [
    {
      kind: "text",
      title: "Avancer sans vraiment savoir pourquoi",
      paragraphs: [
        "Tu fais ce qu’il faut.",
        "Tu avances. Tu travailles. Tu étudies. Tu construis des projets.",
        "Objectivement, tout va plutôt bien.",
        "Et pourtant, une question revient en arrière-plan : pourquoi ?",
      ],
    },

    {
      kind: "text",
      title: "Quand le sens dépassait l’individu",
      paragraphs: [
        "Pendant longtemps, les humains vivaient avec l’idée de servir quelque chose de plus grand qu’eux.",
        "Élever leur âme, honorer des dieux, transmettre, laisser une trace.",
        "Des monuments comme les pyramides de Gizeh, les cathédrales ou les temples mayas n’ont pas été construits pour le profit.",
        "Ils répondaient à un besoin de sens, de sacré, de dépassement.",
      ],
    },

    {
      kind: "text",
      title: "Même les grandes épopées modernes s’essoufflent",
      paragraphs: [
        "Plus récemment, d’autres récits ont porté l’humanité.",
        "La conquête de l’espace. L’exploration du monde. L’apparition d’Internet.",
        "Des promesses vertigineuses, des révolutions qui donnaient le sentiment d’aller quelque part.",
        "Aujourd’hui, ces récits semblent avoir atteint une forme de plafond.",
        "Les progrès continuent, mais ils impressionnent moins. Ils optimisent plus qu’ils ne font rêver.",
      ],
    },

    {
      kind: "quote",
      text: "Le problème n’est pas que la vie soit difficile. C’est qu’elle ne raconte plus rien.",
    },

    {
      kind: "list",
      title: "Signaux typiques",
      items: [
        "Tu avances sans te projeter réellement dans l’avenir.",
        "Tes envies changent souvent, rien ne semble tenir dans la durée.",
        "Tu ressens une fatigue morale sans raison précise.",
        "Tu cherches parfois des pics d’émotion pour combler un vide.",
        "La réussite matérielle seule ne suffit plus à motiver.",
      ],
    },

    {
      kind: "text",
      title: "Ce que la perte de sens abîme",
      paragraphs: [
        "La projection : imaginer un futur désirable devient difficile.",
        "La motivation profonde : autre chose que la pression ou la peur.",
        "Le goût de l’effort long : tout paraît lourd, inutile, trop lent.",
        "La joie simple d’exister sans objectif précis.",
      ],
    },

    {
      kind: "actions",
      title: "Micro-gestes pour refabriquer du sens",
      items: [
        {
          title: "Choisir une valeur plutôt qu’un objectif",
          desc: "Création, force, liberté, transmission, beauté. Une valeur guide mieux qu’une to-do list.",
        },
        {
          title: "S’inscrire dans la durée",
          desc: "Un projet long, imparfait, lent. Le sens naît souvent de la continuité.",
        },
        {
          title: "Introduire de l’inutile",
          desc: "Art, musique, écriture, lecture. Ce qui ne sert à rien nourrit souvent l’essentiel.",
        },
        {
          title: "S’ancrer dans un lieu réel",
          desc: "Salle de sport, atelier, café, club. Le sens passe aussi par l’appartenance.",
        },
        {
          title: "Servir plus grand que soi",
          desc: "Aider, transmettre, coacher, créer pour d’autres. Le sens se partage.",
        },
        {
          title: "Créer des rituels",
          desc: "Hebdomadaires ou mensuels. La répétition transforme le temps en histoire.",
        },
      ],
    },

    {
      kind: "text",
      title: "Passer à la suite",
      paragraphs: [
        "Le sens ne revient pas d’un coup.",
        "Il se reconstruit par des gestes, des rythmes, une posture.",
        "La dernière étape n’est pas une solution miracle, mais une pratique quotidienne : réenchanter.",
      ],
    },
  ],
  reenchanter: [
    {
      kind: "text",
      title: "Pas un miracle. Une posture.",
      paragraphs: [
        "Réenchanter ne veut pas dire redevenir naïf.",
        "Ce n’est pas nier le monde, ni oublier ce qui pèse.",
        "C’est apprendre à habiter le réel autrement, malgré tout.",
        "Pas en cherchant des sensations fortes, mais en redonnant de l’épaisseur au quotidien.",
      ],
    },

    {
      kind: "text",
      title: "Revenir à ce qu’on a perdu",
      paragraphs: [
        "Quand on était enfant, l’ennui faisait partie de la vie.",
        "On ne comblait pas chaque instant avec un écran.",
        "L’esprit avait de l’espace pour errer, inventer, observer.",
        "C’est souvent dans ces moments-là que l’imaginaire renaît.",
      ],
    },

    {
      kind: "quote",
      text: "Le réel redevient dense quand on cesse de le traverser en pilote automatique.",
    },

    {
      kind: "list",
      title: "Ce qui réenchante vraiment",
      items: [
        "L’ennui, non pas comme un vide, mais comme un terrain fertile.",
        "L’effort, qui redonne de la valeur au temps.",
        "La main, qui fabrique, touche, transforme.",
        "La nature, avec ses rythmes lents et indifférents.",
        "L’imaginaire, non pas pour fuir, mais pour épaissir le réel.",
      ],
    },

    {
      kind: "text",
      title: "Faire avec ses mains",
      paragraphs: [
        "Créer quelque chose soi-même change profondément la relation au monde.",
        "Cuisiner plutôt que commander.",
        "Réparer, bricoler, fabriquer, dessiner, écrire, photographier, monter une vidéo, faire de la musique.",
        "L’objectif n’est pas la perfection ni quelque chose d’instagrammable.",
        "C’est d’avoir un résultat imparfait, mais profondément à toi.",
        "Quand tu matérialises quelque chose avec tes mains, tu ancres ton existence dans le réel.",
      ],
    },

    {
      kind: "text",
      title: "Ralentir volontairement",
      paragraphs: [
        "Marcher pour marcher.",
        "Sortir sans écouteurs.",
        "Observer un paysage sans chercher à le capturer.",
        "Accepter que tout ne soit pas rentable, optimisé ou utile.",
        "Tout n’a pas besoin d’un objectif pour avoir de la valeur.",
      ],
    },

    {
      kind: "actions",
      title: "Micro-actions pour réenchanter le quotidien",
      items: [
        {
          title: "Apprendre à s’ennuyer",
          desc: "Ne pas combler chaque moment libre. Laisser le silence et l’esprit revenir.",
        },
        {
          title: "Privilégier l’effort",
          desc: "Cuisiner, marcher, créer. L’effort donne une saveur que la facilité n’a pas.",
        },
        {
          title: "Créer avec ses mains",
          desc: "Peu importe le médium. L’important est de produire, pas de consommer.",
        },
        {
          title: "Se rapprocher de la nature",
          desc: "Marcher, observer, écouter. La nature remet les choses à leur place.",
        },
        {
          title: "Nourrir son imaginaire",
          desc: "Lire, inventer, s’intéresser à l’histoire, aux cultures, aux mythes. Même si ça ne sert à rien.",
        },
        {
          title: "Ritualiser l’ordinaire",
          desc: "Un café, une marche, une lumière, une playlist. Le rituel transforme le banal.",
        },
      ],
    },

    {
      kind: "text",
      title: "Réenchanter à petite échelle",
      paragraphs: [
        "Tu n’as peut-être pas le pouvoir de réenchanter le monde.",
        "Mais tu peux réenchanter ta vie.",
        "Par des gestes simples, répétés, incarnés.",
        "Réenchanter son monde, c’est redevenir créateur à petite échelle.",
        "Et parfois, ça suffit pour recommencer à avancer.",
      ],
    },
  ],
};
