//
//  NoteTableViewCell.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/3/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "NoteTableViewCell.h"

@implementation NoteTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

-(void)setModel:(NoteModel *)model {
    _model = model;
    
    self.titleLabel.text = model.title;
//    self.createdLabel.text = model.crea
}

@end
