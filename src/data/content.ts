// Content shared by several pages. Writing rules: French, no en/em dashes,
// plain space before ? ! : ; (frenchSpacing() makes it non-breaking).
import step1 from '../assets/images/photos/photo-gouttiere.webp';
import step2 from '../assets/images/photos/inspection.webp';
import step3 from '../assets/images/photos/terrasses-balcons.webp';

export const categories = [
  { id: 'logement', title: 'Logement', intro: 'Pour les propriétaires, locataires et agences qui préparent un logement.' },
  { id: 'exterieur', title: 'Extérieur', intro: "Pour l'extérieur de votre maison, des vitres jusqu'au toit." },
  { id: 'professionnels', title: 'Professionnels', intro: "Pour les entreprises, commerces et syndics d'immeuble." },
] as const;
export type CategoryId = (typeof categories)[number]['id'];

export const steps = [
  { title: 'Vous décrivez votre besoin', text: 'Par le formulaire, par téléphone ou sur WhatsApp, avec quelques photos si possible.', image: step1 },
  { title: 'Nous vous envoyons un devis', text: 'Un devis précis et adapté à votre situation, sous 48 heures.', image: step2 },
  { title: 'Nous intervenons', text: 'Nous fixons une date ensemble et réalisons le nettoyage prévu.', image: step3 },
];

// Facts only (no invented ratings or customer counts).
export const stats = [
  { value: '48', suffix: ' h', label: 'Pour recevoir votre devis' },
  { value: '8', label: 'Services de nettoyage' },
  { value: '3', label: "Domaines d'intervention" },
];

// TODO: answers to be validated before going live.
export const faqs = {
  accueil: {
    title: 'Vos questions sur nos services de nettoyage',
    description: "Les réponses aux questions qu'on nous pose le plus souvent, avant même de demander un devis.",
    items: [
      { question: 'Dans quelle zone intervenez-vous ?', answer: "Nous intervenons à Bruxelles et dans ses environs, chez les particuliers comme chez les professionnels : dans les 19 communes de la Région de Bruxelles-Capitale et dans les communes voisines. Indiquez votre adresse ou votre commune dans votre demande et nous vous confirmons rapidement si nous pouvons nous déplacer chez vous. Pour les interventions régulières, comme l'entretien de bureaux ou de parties communes, nous organisons nos passages pour garantir un service fiable, semaine après semaine." },
      { question: 'Comment obtenir un devis ?', answer: "Remplissez le formulaire de contact, appelez-nous ou écrivez-nous sur WhatsApp. Décrivez le travail à faire, la surface ou le nombre d'éléments à nettoyer, l'accès et le délai souhaité, et ajoutez quelques photos si possible. Avec ces informations, nous revenons vers vous avec un devis précis sous 48 heures. Vous savez ainsi exactement ce qui sera fait et à quel prix avant de vous décider." },
      { question: 'Quels services de nettoyage proposez-vous ?', answer: "Nous couvrons trois domaines. Pour le logement : la remise en état avant vente, location ou état des lieux, et le nettoyage anti-nicotine. Pour l'extérieur : le nettoyage de vitres, de panneaux solaires, de gouttières, de terrasses et de balcons. Pour les professionnels : l'entretien de bureaux et de commerces et le nettoyage des parties communes d'immeuble. Vous pouvez combiner plusieurs services dans une seule demande." },
      { question: 'Travaillez-vous pour les particuliers et les professionnels ?', answer: "Oui. Nous nettoyons les logements et les extérieurs des particuliers, propriétaires et locataires, ainsi que les bureaux, commerces et parties communes d'immeuble pour les entreprises, les agences immobilières et les syndics. Chaque demande est traitée de la même façon : un devis clair, une date convenue ensemble et un travail contrôlé en fin d'intervention." },
      { question: 'Intervenez-vous ponctuellement ou régulièrement ?', answer: "Les deux. Nous intervenons pour un nettoyage ponctuel, par exemple avant un état des lieux, après des travaux ou pour un grand nettoyage de printemps, ou selon un rythme défini ensemble. Les passages réguliers conviennent particulièrement à l'entretien des vitres, des bureaux, des commerces et des parties communes d'immeuble. Le rythme peut être ajusté à tout moment selon vos besoins." },
      { question: "Faut-il être présent pendant l'intervention ?", answer: "Pas forcément. Pour un nettoyage extérieur, comme les gouttières, les panneaux solaires ou une terrasse, il suffit souvent que l'accès soit possible. Pour un nettoyage intérieur, nous convenons avec vous de la remise des clés ou de l'accès au logement ou aux locaux. Nous vous prévenons au début et à la fin de l'intervention." },
      { question: "Que se passe-t-il si le résultat ne me convient pas ?", answer: "En fin d'intervention, nous faisons le tour du travail réalisé. Si un détail ne vous convient pas, signalez-le nous : nous le reprenons. Notre objectif est que vous soyez satisfait du résultat et que vous fassiez de nouveau appel à nous le jour où vous en aurez besoin." },
    ],
  },
  services: {
    title: 'Bien choisir votre service',
    description: 'Vous hésitez entre plusieurs services ou votre besoin sort du cadre ? Voici l’essentiel.',
    items: [
      { question: 'Combien coûte une intervention ?', answer: "Chaque intervention est différente : le prix dépend de la surface à nettoyer, de l'état des lieux, de l'accès, de la hauteur, du matériel nécessaire et de la fréquence pour un entretien régulier. Plutôt que d'afficher un tarif qui ne correspondrait pas à votre situation, nous établissons un devis adapté après votre demande. Avec une description précise et quelques photos, vous recevez ce devis sous 48 heures." },
      { question: 'Pouvez-vous combiner plusieurs services ?', answer: "Oui, et c'est souvent plus pratique pour vous. Indiquez tous vos besoins dans votre demande, par exemple les vitres et les gouttières, ou une remise en état avec un nettoyage anti-nicotine, et nous préparons un devis qui regroupe l'ensemble. Les interventions peuvent alors être réalisées le même jour ou planifiées à la suite, avec un seul interlocuteur." },
      { question: "Je ne trouve pas le service dont j'ai besoin", answer: "Choisissez « Autre demande » dans le formulaire de contact et décrivez votre besoin le plus précisément possible, avec des photos si vous le pouvez. Nous vous disons rapidement si nous pouvons nous en charger. Si ce n'est pas le cas, nous vous le disons franchement plutôt que de proposer une intervention qui ne vous donnerait pas satisfaction." },
      { question: 'Intervenez-vous en hauteur ?', answer: "Oui. Nous vidons et nettoyons les gouttières à toutes les hauteurs, et nous intervenons sur les toits pour le nettoyage des panneaux solaires. Pour les vitres en hauteur, les fenêtres de toit, les vérandas et les panneaux solaires, précisez le type de bâtiment, le nombre d'étages et l'accès dans votre demande, idéalement avec une photo, pour que nous prévoyions le matériel adapté." },
      { question: 'Apportez-vous le matériel et les produits ?', answer: "Oui. Nous venons avec le matériel et les produits nécessaires à chaque intervention, choisis selon les surfaces à traiter : verre, pierre, carrelage, panneaux solaires ou revêtements intérieurs. Pour les nettoyages intérieurs, il suffit que l'eau et l'électricité soient disponibles sur place." },
      { question: 'Quel délai pour une intervention ?', answer: "Vous recevez votre devis sous 48 heures. Une fois le devis accepté, nous fixons ensemble une date qui vous convient. Le délai dépend de la période : le printemps et la fin de l'automne sont très demandés pour les terrasses, les gouttières et les vitres, tout comme les fins de mois pour les remises en état. Si vous avez une date impérative, comme un état des lieux, indiquez-la dès votre demande." },
    ],
  },
  contact: {
    title: 'Avant de nous écrire',
    description: 'Quelques informations pratiques pour obtenir une réponse rapide et un devis précis.',
    items: [
      { question: 'Sous quel délai recevrai-je une réponse ?', answer: "Nous revenons vers vous sous 48 heures avec un devis ou, si nous avons besoin de précisions, avec quelques questions sur votre demande. Pour une demande urgente, par exemple un état des lieux dans quelques jours ou une gouttière qui déborde, appelez-nous directement ou écrivez-nous sur WhatsApp : c'est le moyen le plus rapide de nous joindre." },
      { question: 'Que dois-je indiquer dans ma demande ?', answer: "Le type de travail, votre commune, la surface ou le nombre d'éléments à nettoyer, l'état actuel, l'accès (étage, hauteur, parking à proximité) et le délai souhaité. Pour un entretien régulier, précisez aussi la fréquence et vos horaires. Plus votre demande est précise, plus le devis l'est aussi, et moins nous aurons besoin de revenir vers vous avec des questions." },
      { question: 'Puis-je envoyer des photos ?', answer: "Oui, et nous vous le recommandons. Envoyez-les par WhatsApp : c'est souvent le moyen le plus rapide d'obtenir un devis précis. Quelques photos de la cuisine et de la salle de bain pour une remise en état, de la façade pour des gouttières ou des vitres, ou de la terrasse à nettoyer nous permettent d'évaluer le travail sans nous déplacer. Les photos servent uniquement à préparer votre devis et ne sont pas conservées ensuite." },
      { question: 'Le devis est-il payant ?', answer: "Non, la demande de devis est sans engagement. Vous recevez une proposition détaillée et vous êtes libre de l'accepter ou non. Si vous avez des questions sur le devis, nous prenons le temps d'y répondre avant que vous preniez votre décision." },
      { question: 'Mes données sont-elles partagées ?', answer: "Non. Les informations que vous nous transmettez servent uniquement à répondre à votre demande et à préparer votre devis. Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales. Pour en savoir plus sur la façon dont nous traitons vos données et sur vos droits, consultez notre politique de confidentialité." },
    ],
  },
};
